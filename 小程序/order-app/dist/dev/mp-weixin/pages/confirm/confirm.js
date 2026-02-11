"use strict";
var common_vendor = require("../../common/vendor.js");
var store_order = require("../../store/order.js");
var store_car = require("../../store/car.js");
var store_address = require("../../store/address.js");
var api_user = require("../../api/user.js");
var api_order = require("../../api/order.js");
require("../../common/http.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "confirm",
  setup(__props) {
    const store = store_order.orderStore();
    const carstore = store_car.carStore();
    const astore = store_address.addressStore();
    const goods = common_vendor.computed$1(() => {
      return store.orderList;
    });
    const totalNum = common_vendor.computed$1(() => {
      let totalNum2 = 0;
      store.orderList.map((item) => {
        item.flag ? totalNum2 += item.num : totalNum2 += 0;
      });
      return totalNum2;
    });
    const totalPrice = common_vendor.computed$1(() => {
      let totalPrice2 = 0;
      store.orderList.map((item) => {
        item.flag ? totalPrice2 += item.num * item.price : totalPrice2 += 0;
      });
      return totalPrice2;
    });
    const toAddress = (item) => {
      common_vendor.index.navigateTo({
        url: "../addresslist/addresslist"
      });
    };
    const getAddress = async () => {
      let res = await api_user.getAddressApi({
        openid: common_vendor.index.getStorageSync("openid")
      });
      console.log(res);
      if (res && res.code == 200 && res.data) {
        astore.checkedId = res.data.addressId;
        astore.userName = res.data.userName;
        astore.phone = res.data.phone;
        astore.area = res.data.area;
        astore.address = res.data.address;
      }
    };
    const commitBtn = async () => {
      if (!astore.address) {
        common_vendor.index.showToast({
          title: "\u8BF7\u586B\u5199\u6536\u8D27\u5730\u5740",
          duration: 2e3
        });
        return;
      }
      let commitParm = common_vendor.reactive({
        openid: common_vendor.index.getStorageSync("openid"),
        userName: astore.userName,
        phone: astore.phone,
        address: astore.area + "," + astore.address,
        price: totalPrice.value,
        details: store.orderList
      });
      const res = await api_order.splaceOrderApi(commitParm);
      console.log(res);
      if (res && res.code == 200) {
        store.orderList = [];
        carstore.carList = [];
        common_vendor.index.navigateBack();
        common_vendor.index.navigateTo({
          url: "../order/order"
        });
      }
    };
    common_vendor.onLoad(() => {
      getAddress();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(astore).userName),
        b: common_vendor.t(common_vendor.unref(astore).phone),
        c: !common_vendor.unref(astore).address
      }, !common_vendor.unref(astore).address ? {} : {}, {
        d: common_vendor.t(common_vendor.unref(astore).area),
        e: common_vendor.t(common_vendor.unref(astore).address),
        f: common_vendor.p({
          name: "arrow-right",
          color: "#c8c9cc"
        }),
        g: common_vendor.o(toAddress),
        h: common_vendor.unref(goods).length > 0
      }, common_vendor.unref(goods).length > 0 ? {
        i: common_vendor.f(common_vendor.unref(goods), (item, index, i0) => {
          return {
            a: item.goodsImage,
            b: common_vendor.t(item.goodsName),
            c: common_vendor.t(item.specsName),
            d: common_vendor.t(item.price),
            e: common_vendor.t(item.goodsUnit),
            f: common_vendor.t(item.num),
            g: index
          };
        })
      } : {}, {
        j: common_vendor.t(common_vendor.unref(totalPrice)),
        k: common_vendor.t(common_vendor.unref(totalNum)),
        l: common_vendor.o(commitBtn)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/confirm/confirm.vue"]]);
wx.createPage(MiniProgramPage);
