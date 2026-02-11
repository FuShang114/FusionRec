"use strict";
var common_vendor = require("../common/vendor.js");
var common_http = require("../common/http.js");
var store_user = require("../store/user.js");
const getCode = () => {
  const promise = new Promise((resolve, reject) => {
    common_vendor.index.login({
      provider: "weixin",
      success: function(loginRes) {
        console.log("8888888888");
        console.log(loginRes.code);
        if (loginRes && loginRes.code) {
          resolve(loginRes.code);
        } else {
          reject(loginRes);
        }
      }
    });
  }).catch((res) => {
    common_vendor.index.showToast({
      icon: "none",
      title: res.errMsg || "\u83B7\u53D6code\u5931\u8D25!"
    });
  });
  return promise;
};
const getUserInfoApi = (parm) => {
  return common_http.http.get("/wxapi/wxUser/getUserInfo", parm);
};
const wxLoginApi = (code) => {
  return common_http.http.post("/wxapi/user/wxLogin", {
    code
  });
};
const userLogin = async () => {
  const store = store_user.userStore();
  let res = await getCode();
  const {
    data
  } = await wxLoginApi(res);
  console.log("\u767B\u5F55");
  console.log(data);
  if (data) {
    common_vendor.index.setStorageSync("openid", data.openid);
    common_vendor.index.setStorageSync("sessionkey", data.sessionKey);
  }
  let result = await getUserInfoApi({
    openid: data.openid
  });
  console.log(result.data);
  if (result.data && result.data.avatarUrl) {
    store.avatarUrl = result.data.avatarUrl;
    common_vendor.index.setStorageSync("avatarUrl", result.data.avatarUrl);
  }
  if (result.data && result.data.nickName) {
    store.nickName = result.data.nickName;
    common_vendor.index.setStorageSync("nickName", result.data.nickName);
  }
};
const addAddressApi = (parm) => {
  return common_http.http.post("/wxapi/address", parm);
};
const addressListApi = (parm) => {
  return common_http.http.get("/wxapi/address/list", parm);
};
const editAddressApi = (parm) => {
  return common_http.http.put("/wxapi/address", parm);
};
const getAddressApi = (parm) => {
  return common_http.http.get("/wxapi/address/getAddress", parm);
};
const uploadImageApi = (parm) => {
  return common_http.http.upload(parm);
};
const saveOrUpdateApi = (parm) => {
  return common_http.http.post("/wxapi/wxUser/saveOrUpdate", parm);
};
const addCommentApi = (parm) => {
  return common_http.http.post("/wxapi/comment/addComment", parm);
};
const listCollectApi = (parm) => {
  return common_http.http.get("/wxapi/collect/list", parm);
};
const deleteCollectApi = (parm) => {
  return common_http.http.post("/wxapi/collect/deleteCollect", parm);
};
exports.addAddressApi = addAddressApi;
exports.addCommentApi = addCommentApi;
exports.addressListApi = addressListApi;
exports.deleteCollectApi = deleteCollectApi;
exports.editAddressApi = editAddressApi;
exports.getAddressApi = getAddressApi;
exports.listCollectApi = listCollectApi;
exports.saveOrUpdateApi = saveOrUpdateApi;
exports.uploadImageApi = uploadImageApi;
exports.userLogin = userLogin;
