"use strict";
var common_vendor = require("../common/vendor.js");
const userStore = common_vendor.defineStore("userStore", {
  state: () => {
    return {
      nickName: "",
      avatarUrl: ""
    };
  },
  actions: {}
});
exports.userStore = userStore;
