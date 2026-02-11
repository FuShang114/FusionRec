"use strict";
var common_vendor = require("../common/vendor.js");
const carStore = common_vendor.defineStore("carStore", {
  state: () => {
    return {
      count: 0,
      carList: []
    };
  },
  actions: {
    increment() {
      this.count++;
    },
    addCar(goods) {
      const index = this.carList.findIndex((item) => goods.goodsId == item.goodsId);
      if (index > -1) {
        this.carList.splice(index, 1);
      }
      this.carList.push(goods);
    }
  }
});
exports.carStore = carStore;
