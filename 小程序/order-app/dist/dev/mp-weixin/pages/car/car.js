"use strict";
var common_vendor = require("../../common/vendor.js");
var store_car = require("../../store/car.js");
var store_order = require("../../store/order.js");
const _sfc_main = {
  __name: "car",
  setup(__props) {
    const store = store_car.carStore();
    const ostore = store_order.orderStore();
    common_vendor.ref(true);
    const allchecked = common_vendor.ref(true);
    common_vendor.ref(true);
    const goods = common_vendor.computed$1(() => {
      if (store.carList.length == 0) {
        allchecked.value = false;
      } else {
        allchecked.value = true;
      }
      return store.carList;
    });
    const selected = (e, item) => {
      console.log(e);
      console.log(item);
      if (item.flag == true) {
        item.flag = false;
      } else {
        item.flag = true;
      }
      let newArr = store.carList.filter((item2) => item2.flag == true);
      if (newArr.length == store.carList.length) {
        allchecked.value = true;
      } else {
        allchecked.value = false;
      }
    };
    const selectAlls = () => {
      if (allchecked.value == true) {
        allchecked.value = false;
        store.carList.forEach((item) => {
          item.flag = false;
        });
      } else {
        allchecked.value = true;
        store.carList.forEach((item) => {
          item.flag = true;
        });
      }
    };
    const reduce = (item) => {
      let num = item.num;
      if (num > 1) {
        num -= 1;
      } else if (num = 1) {
        store.carList.map((dom, i) => {
          if (dom.goodsId == item.goodsId) {
            store.carList.splice(i, 1);
          }
        });
      }
      item.num = num;
      if (store.carList.length == 0) {
        allchecked.value = false;
      }
    };
    const add = (item) => {
      let num = item.num;
      item.num = num + 1;
    };
    const totalNum = common_vendor.computed$1(() => {
      let totalNum2 = 0;
      store.carList.map((item) => {
        item.flag ? totalNum2 += item.num : totalNum2 += 0;
      });
      return totalNum2;
    });
    const totalPrice = common_vendor.computed$1(() => {
      let totalPrice2 = 0;
      store.carList.map((item) => {
        item.flag ? totalPrice2 += item.num * item.price : totalPrice2 += 0;
      });
      return totalPrice2;
    });
    const confirm = (item) => {
      ostore.orderList = [];
      if (store.carList.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u9009\u62E9\u83DC\u54C1"
        });
        return;
      }
      let checkedList = store.carList.filter((item2) => item2.flag == true);
      if (checkedList.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u9009\u62E9\u8981\u7ED3\u7B97\u7684\u83DC\u54C1"
        });
        return;
      }
      ostore.addOrderList(checkedList);
      common_vendor.index.navigateTo({
        url: "../confirm/confirm"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(goods).length > 0
      }, common_vendor.unref(goods).length > 0 ? {
        b: common_vendor.f(common_vendor.unref(goods), (item, index, i0) => {
          return {
            a: item.flag,
            b: common_vendor.o(($event) => selected($event, item)),
            c: item.goodsImage,
            d: common_vendor.t(item.goodsName),
            e: common_vendor.t(item.specsName),
            f: common_vendor.t(item.price),
            g: common_vendor.t(item.goodsUnit),
            h: common_vendor.o(($event) => reduce(item)),
            i: common_vendor.t(item.num),
            j: common_vendor.o(($event) => add(item)),
            k: index
          };
        })
      } : {}, {
        c: allchecked.value,
        d: common_vendor.o(selectAlls),
        e: common_vendor.t(common_vendor.unref(totalPrice)),
        f: common_vendor.t(common_vendor.unref(totalNum)),
        g: common_vendor.o(confirm)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/car/car.vue"]]);
wx.createPage(MiniProgramPage);
