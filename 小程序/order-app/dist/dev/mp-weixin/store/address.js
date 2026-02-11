"use strict";
var common_vendor = require("../common/vendor.js");
const addressStore = common_vendor.defineStore("addressStore", {
  state: () => {
    return {
      checkedId: "",
      userName: "",
      phone: "",
      area: "",
      address: ""
    };
  },
  actions: {}
});
exports.addressStore = addressStore;
