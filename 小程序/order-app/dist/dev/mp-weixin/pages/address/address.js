"use strict";
var common_vendor = require("../../common/vendor.js");
var api_user = require("../../api/user.js");
require("../../common/http.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_picker2 + _easycom_u_button2)();
}
const _easycom_u_picker = () => "../../uni_modules/vk-uview-ui/components/u-picker/u-picker.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_picker + _easycom_u_button)();
}
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const show = common_vendor.ref(false);
    common_vendor.ref("");
    const customStyle = common_vendor.reactive({
      margin: "20px"
    });
    const setDefault = (dom) => {
      console.log(dom);
      dom.detail.value ? address.status = "1" : address.status = "0";
    };
    const showRegionPicker = () => {
      show.value = true;
    };
    const confirm = (e) => {
      console.log(e);
      address.area = e.province.name + "/" + e.city.name + "/" + e.area.name;
      console.log(address.area);
    };
    const address = common_vendor.reactive({
      addressId: "",
      openid: common_vendor.index.getStorageSync("openid"),
      userName: "",
      phone: "",
      area: "",
      address: "",
      status: "0"
    });
    const addBtn = async () => {
      console.log(address);
      if (!address.userName) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u586B\u5199\u59D3\u540D"
        });
        return;
      }
      if (!address.phone) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u586B\u5199\u7535\u8BDD"
        });
        return;
      }
      if (!address.area) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u9009\u62E9\u533A\u57DF"
        });
        return;
      }
      if (!address.address) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u586B\u5199\u8BE6\u7EC6\u5730\u5740"
        });
        return;
      }
      let res = null;
      if (type.value == "0") {
        res = await api_user.addAddressApi(address);
      } else {
        res = await api_user.editAddressApi(address);
      }
      console.log(res);
      if (res && res.code == 200) {
        common_vendor.index.navigateBack();
      }
    };
    const type = common_vendor.ref("0");
    common_vendor.onLoad((options) => {
      console.log(options);
      if (options.item) {
        type.value = "1";
        const item = JSON.parse(options.item);
        address.addressId = item.addressId;
        address.phone = item.phone;
        address.userName = item.userName;
        address.area = item.area;
        address.address = item.address;
        address.status = item.status;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: address.userName,
        b: common_vendor.o(($event) => address.userName = $event.detail.value),
        c: address.phone,
        d: common_vendor.o(($event) => address.phone = $event.detail.value),
        e: _ctx.line,
        f: address.area,
        g: common_vendor.o(($event) => address.area = $event.detail.value),
        h: common_vendor.o(confirm),
        i: common_vendor.o(showRegionPicker),
        j: address.address,
        k: common_vendor.o(($event) => address.address = $event.detail.value),
        l: address.status == "1",
        m: common_vendor.o(setDefault),
        n: common_vendor.sr("uPicker", "62a98b85-0"),
        o: common_vendor.o(confirm),
        p: common_vendor.o(($event) => show.value = $event),
        q: common_vendor.p({
          mode: "region",
          modelValue: show.value
        }),
        r: common_vendor.o(addBtn),
        s: common_vendor.p({
          ["custom-style"]: customStyle,
          type: "warning"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-62a98b85"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/address/address.vue"]]);
wx.createPage(MiniProgramPage);
