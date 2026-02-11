"use strict";
var common_vendor = require("../../common/vendor.js");
var store_address = require("../../store/address.js");
var api_user = require("../../api/user.js");
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
  __name: "collect",
  setup(__props) {
    store_address.addressStore();
    common_vendor.ref("/static/user.jpg");
    const siteList = common_vendor.reactive({
      list: []
    });
    const getList = async () => {
      let res = await api_user.listCollectApi({
        openid: common_vendor.index.getStorageSync("openid")
      });
      console.log(res);
      if (res && res.code == 200) {
        siteList.list = res.data;
      }
    };
    const update = async (item) => {
      console.log(item);
      let res = await api_user.deleteCollectApi({
        collectId: item.collectId
      });
      if (res && res.code == 200) {
        common_vendor.index.showToast({
          icon: "none",
          title: res.msg
        });
        getList();
      }
    };
    common_vendor.onShow(() => {
      getList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(siteList.list, (res, index, i0) => {
          return {
            a: res.goodsImage.split(",")[0],
            b: common_vendor.t(res.goodsName),
            c: common_vendor.o(($event) => update(res)),
            d: "3d5b69f1-0-" + i0,
            e: res.id
          };
        }),
        b: common_vendor.p({
          name: "close",
          size: 35,
          color: "#999999"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3d5b69f1"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/collect/collect.vue"]]);
wx.createPage(MiniProgramPage);
