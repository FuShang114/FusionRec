"use strict";
var common_vendor = require("../common/vendor.js");
const orderStore = common_vendor.defineStore("orderStore", {
  state: () => {
    return {
      count: 0,
      orderList: []
    };
  },
  actions: {
    addOrder(goods) {
      const index = this.orderList.findIndex((item) => goods.goodsId == item.goodsId);
      if (index > -1) {
        this.orderList.splice(index, 1);
      }
      this.orderList.push(goods);
    },
    addOrderList(list) {
      list.forEach((goods) => {
        const index = this.orderList.findIndex((item) => goods.goodsId == item.goodsId);
        if (index > -1) {
          this.orderList.splice(index, 1);
        }
        this.orderList.push(goods);
      });
    }
  }
});
exports.orderStore = orderStore;
