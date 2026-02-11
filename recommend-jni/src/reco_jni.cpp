#include <jni.h>
#include <string>
#include <cstdlib>
#include <Python.h>

static std::string jstringToString(JNIEnv *env, jstring str) {
    if (str == nullptr) return "";
    const char *chars = env->GetStringUTFChars(str, nullptr);
    std::string out(chars ? chars : "");
    if (chars) env->ReleaseStringUTFChars(str, chars);
    return out;
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_itmk_web_reco_jni_RecoJniBridge_infer(
        JNIEnv *env,
        jobject,
        jstring jOpenid,
        jstring jScene,
        jstring jGoodsIdsJson,
        jdouble cfWeight,
        jdouble ctrWeight,
        jdouble cvrWeight) {
    std::string openid = jstringToString(env, jOpenid);
    std::string scene = jstringToString(env, jScene);
    std::string goodsIdsJson = jstringToString(env, jGoodsIdsJson);

    if (!Py_IsInitialized()) {
        Py_Initialize();
        const char *root = std::getenv("RECO_PYTHON_ROOT");
        if (root != nullptr) {
            std::string cmd = "import sys; sys.path.insert(0, r'" + std::string(root) + "')";
            PyRun_SimpleString(cmd.c_str());
        }
    }

    PyObject *module = PyImport_ImportModule("online.online_infer");
    if (!module) {
        PyErr_Clear();
        return env->NewStringUTF("");
    }
    PyObject *func = PyObject_GetAttrString(module, "infer");
    if (!func || !PyCallable_Check(func)) {
        Py_XDECREF(func);
        Py_DECREF(module);
        PyErr_Clear();
        return env->NewStringUTF("");
    }

    PyObject *args = Py_BuildValue(
            "(sssddd)",
            openid.c_str(),
            scene.c_str(),
            goodsIdsJson.c_str(),
            static_cast<double>(cfWeight),
            static_cast<double>(ctrWeight),
            static_cast<double>(cvrWeight));
    PyObject *ret = PyObject_CallObject(func, args);
    Py_DECREF(args);
    Py_DECREF(func);
    Py_DECREF(module);

    if (!ret) {
        PyErr_Clear();
        return env->NewStringUTF("");
    }

    const char *result = PyUnicode_AsUTF8(ret);
    std::string out = result ? result : "";
    Py_DECREF(ret);
    return env->NewStringUTF(out.c_str());
}
