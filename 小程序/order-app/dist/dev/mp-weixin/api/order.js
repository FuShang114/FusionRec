"use strict";
var common_http = require("../common/http.js");
const splaceOrderApi = (parm) => {
  return common_http.http.post("/wxapi/order/splaceOrder", parm);
};
const getOrderListApi = (parm) => {
  return common_http.http.get("/wxapi/order/getOrderList", parm);
};
const cancelOrderApi = (parm) => {
  return common_http.http.post("/wxapi/order/cancelOrder", parm);
};
const commentListApi = (parm) => {
  return common_http.http.get("/wxapi/comment/commentList", parm);
};
const addCollectApi = (parm) => {
  return common_http.http.post("/wxapi/collect/addCollect", parm);
};
const hasCollectApi = (parm) => {
  return common_http.http.get("/wxapi/collect/hasCollect", parm);
};
const cancelCollectApi = (parm) => {
  return common_http.http.post("/wxapi/collect/cancelCollect", parm);
};
const confirmOrderApi = (parm) => {
  return common_http.http.post("/wxapi/order/confirmOrder", parm);
};
exports.addCollectApi = addCollectApi;
exports.cancelCollectApi = cancelCollectApi;
exports.cancelOrderApi = cancelOrderApi;
exports.commentListApi = commentListApi;
exports.confirmOrderApi = confirmOrderApi;
exports.getOrderListApi = getOrderListApi;
exports.hasCollectApi = hasCollectApi;
exports.splaceOrderApi = splaceOrderApi;
