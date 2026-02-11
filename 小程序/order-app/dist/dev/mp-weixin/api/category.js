"use strict";
var common_http = require("../common/http.js");
const getCategoryListApi = () => {
  return common_http.http.get("/wxapi/category/getCategoryList");
};
exports.getCategoryListApi = getCategoryListApi;
