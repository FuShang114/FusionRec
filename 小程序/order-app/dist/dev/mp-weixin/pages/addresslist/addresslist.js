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
  __name: "addresslist",
  setup(__props) {
    const store = store_address.addressStore();
    const siteList = common_vendor.reactive({
      list: []
    });
    const getList = async () => {
      let res = await api_user.addressListApi({
        openid: common_vendor.index.getStorageSync("openid")
      });
      console.log(res);
      if (res && res.code == 200) {
        siteList.list = res.data;
      }
    };
    const toAddSite = () => {
      common_vendor.index.navigateTo({
        url: "../address/address"
      });
    };
    const update = (item) => {
      console.log(item);
      common_vendor.index.navigateTo({
        url: "../address/address?item=" + JSON.stringify(item)
      });
    };
    const radioChange = (e) => {
      console.log(e);
      if (e.detail.value) {
        let item = JSON.parse(e.detail.value);
        store.checkedId = item.addressId;
        store.userName = item.userName;
        store.phone = item.phone;
        store.area = item.area;
        store.address = item.address;
        common_vendor.index.navigateBack();
      }
    };
    common_vendor.onShow(() => {
      getList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(siteList.list, (res, index, i0) => {
          return common_vendor.e({
            a: JSON.stringify(res),
            b: res.addressId == common_vendor.unref(store).checkedId,
            c: common_vendor.t(res.userName),
            d: common_vendor.t(res.phone),
            e: res.status == "1"
          }, res.status == "1" ? {} : {}, {
            f: common_vendor.t(res.area),
            g: common_vendor.t(res.address),
            h: common_vendor.o(($event) => update(res)),
            i: "0c91af41-0-" + i0,
            j: res.id
          });
        }),
        b: common_vendor.p({
          name: "edit-pen",
          size: 40,
          color: "#999999"
        }),
        c: common_vendor.o(radioChange),
        d: common_vendor.p({
          name: "plus",
          color: "#ffffff",
          size: 30
        }),
        e: common_vendor.o(toAddSite)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c91af41"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/addresslist/addresslist.vue"]]);
wx.createPage(MiniProgramPage);
