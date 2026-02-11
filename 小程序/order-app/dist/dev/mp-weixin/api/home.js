"use strict";
var common_http = require("../common/http.js");
const getSwipperListApi = () => {
  return common_http.http.get("/api/home/getSwipperList");
};
const getHotListApi = () => {
  return common_http.http.get("/api/home/getHotList");
};
exports.getHotListApi = getHotListApi;
exports.getSwipperListApi = getSwipperListApi;
