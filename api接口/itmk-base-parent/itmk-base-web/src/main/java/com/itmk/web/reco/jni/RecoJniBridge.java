package com.itmk.web.reco.jni;

public class RecoJniBridge {
    private static volatile boolean loaded = false;

    static {
        try {
            System.loadLibrary("reco_jni");
            loaded = true;
        } catch (Throwable ignore) {
            loaded = false;
        }
    }

    public static boolean isLoaded() {
        return loaded;
    }

    public native String infer(String openid, String scene, String goodsIdsJson, double cfWeight, double ctrWeight, double cvrWeight);
}
