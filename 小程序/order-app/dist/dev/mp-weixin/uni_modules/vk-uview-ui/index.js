"use strict";
var common_vendor = require("../../common/vendor.js");
var uni_modules_vkUviewUi_libs_mixin_mixin = require("./libs/mixin/mixin.js");
var uni_modules_vkUviewUi_libs_request_index = require("./libs/request/index.js");
var uni_modules_vkUviewUi_libs_function_queryParams = require("./libs/function/queryParams.js");
var uni_modules_vkUviewUi_libs_function_route = require("./libs/function/route.js");
var uni_modules_vkUviewUi_libs_function_timeFormat = require("./libs/function/timeFormat.js");
var uni_modules_vkUviewUi_libs_function_timeFrom = require("./libs/function/timeFrom.js");
var uni_modules_vkUviewUi_libs_function_colorGradient = require("./libs/function/colorGradient.js");
var uni_modules_vkUviewUi_libs_function_guid = require("./libs/function/guid.js");
var uni_modules_vkUviewUi_libs_function_color = require("./libs/function/color.js");
var uni_modules_vkUviewUi_libs_function_type2icon = require("./libs/function/type2icon.js");
var uni_modules_vkUviewUi_libs_function_randomArray = require("./libs/function/randomArray.js");
var uni_modules_vkUviewUi_libs_function_deepClone = require("./libs/function/deepClone.js");
var uni_modules_vkUviewUi_libs_function_deepMerge = require("./libs/function/deepMerge.js");
var uni_modules_vkUviewUi_libs_function_addUnit = require("./libs/function/addUnit.js");
var uni_modules_vkUviewUi_libs_function_test = require("./libs/function/test.js");
var uni_modules_vkUviewUi_libs_function_random = require("./libs/function/random.js");
var uni_modules_vkUviewUi_libs_function_trim = require("./libs/function/trim.js");
var uni_modules_vkUviewUi_libs_function_toast = require("./libs/function/toast.js");
var uni_modules_vkUviewUi_libs_function_getParent = require("./libs/function/getParent.js");
var uni_modules_vkUviewUi_libs_function_$parent = require("./libs/function/_parent.js");
var uni_modules_vkUviewUi_libs_function_sys = require("./libs/function/sys.js");
var uni_modules_vkUviewUi_libs_function_debounce = require("./libs/function/debounce.js");
var uni_modules_vkUviewUi_libs_function_throttle = require("./libs/function/throttle.js");
var uni_modules_vkUviewUi_libs_config_config = require("./libs/config/config.js");
var uni_modules_vkUviewUi_libs_config_zIndex = require("./libs/config/zIndex.js");
function wranning(str) {
  {
    console.warn(str);
  }
}
const $u = {
  queryParams: uni_modules_vkUviewUi_libs_function_queryParams.queryParams,
  route: uni_modules_vkUviewUi_libs_function_route.route,
  timeFormat: uni_modules_vkUviewUi_libs_function_timeFormat.timeFormat,
  date: uni_modules_vkUviewUi_libs_function_timeFormat.timeFormat,
  timeFrom: uni_modules_vkUviewUi_libs_function_timeFrom.timeFrom,
  colorGradient: uni_modules_vkUviewUi_libs_function_colorGradient.colorGradient.colorGradient,
  colorToRgba: uni_modules_vkUviewUi_libs_function_colorGradient.colorGradient.colorToRgba,
  guid: uni_modules_vkUviewUi_libs_function_guid.guid,
  color: uni_modules_vkUviewUi_libs_function_color.color,
  sys: uni_modules_vkUviewUi_libs_function_sys.sys,
  os: uni_modules_vkUviewUi_libs_function_sys.os,
  type2icon: uni_modules_vkUviewUi_libs_function_type2icon.type2icon,
  randomArray: uni_modules_vkUviewUi_libs_function_randomArray.randomArray,
  wranning,
  get: uni_modules_vkUviewUi_libs_request_index.http.get,
  post: uni_modules_vkUviewUi_libs_request_index.http.post,
  put: uni_modules_vkUviewUi_libs_request_index.http.put,
  "delete": uni_modules_vkUviewUi_libs_request_index.http.delete,
  hexToRgb: uni_modules_vkUviewUi_libs_function_colorGradient.colorGradient.hexToRgb,
  rgbToHex: uni_modules_vkUviewUi_libs_function_colorGradient.colorGradient.rgbToHex,
  test: uni_modules_vkUviewUi_libs_function_test.test,
  random: uni_modules_vkUviewUi_libs_function_random.random,
  deepClone: uni_modules_vkUviewUi_libs_function_deepClone.deepClone,
  deepMerge: uni_modules_vkUviewUi_libs_function_deepMerge.deepMerge,
  getParent: uni_modules_vkUviewUi_libs_function_getParent.getParent,
  $parent: uni_modules_vkUviewUi_libs_function_$parent.$parent,
  addUnit: uni_modules_vkUviewUi_libs_function_addUnit.addUnit,
  trim: uni_modules_vkUviewUi_libs_function_trim.trim,
  type: ["primary", "success", "error", "warning", "info"],
  http: uni_modules_vkUviewUi_libs_request_index.http,
  toast: uni_modules_vkUviewUi_libs_function_toast.toast,
  config: uni_modules_vkUviewUi_libs_config_config.config,
  zIndex: uni_modules_vkUviewUi_libs_config_zIndex.zIndex,
  debounce: uni_modules_vkUviewUi_libs_function_debounce.debounce,
  throttle: uni_modules_vkUviewUi_libs_function_throttle.throttle
};
common_vendor.index.$u = $u;
const install = (Vue) => {
  Vue.mixin(uni_modules_vkUviewUi_libs_mixin_mixin.mixin);
  Vue.config.globalProperties.$u = $u;
};
var uView = {
  install
};
exports.uView = uView;
