"use strict";
var common_vendor = require("../../common/vendor.js");
var api_user = require("../../api/user.js");
var common_http = require("../../common/http.js");
var store_user = require("../../store/user.js");
if (!Array) {
  const _easycom_u_cell_item2 = common_vendor.resolveComponent("u-cell-item");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  (_easycom_u_cell_item2 + _easycom_u_cell_group2)();
}
const _easycom_u_cell_item = () => "../../uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.js";
const _easycom_u_cell_group = () => "../../uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_u_cell_item + _easycom_u_cell_group)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const ustore = store_user.userStore();
    const instance = common_vendor.getCurrentInstance();
    const nickName = common_vendor.computed$1(() => {
      if (ustore.nickName) {
        return ustore.nickName;
      } else {
        return "";
      }
    });
    const avatarUrl = common_vendor.computed$1(() => {
      if (ustore.avatarUrl) {
        return common_http.http.baseUrl + ustore.avatarUrl;
      } else {
        return "/static/user.jpg";
      }
    });
    const onChooseAvatar = (e) => {
      console.log(e);
      avatarUrl.value = e.detail.avatarUrl;
      api_user.uploadImageApi({
        url: "/api/upload/uploadImage",
        filePath: e.detail.avatarUrl
      }).then((res) => {
        console.log(res);
        let result = JSON.parse(res);
        api_user.saveOrUpdateApi({
          openid: common_vendor.index.getStorageSync("openid"),
          avatarUrl: result.data
        }).then((res2) => {
          console.log(res2);
          ustore.avatarUrl = result.data;
        });
      });
    };
    const onNickName = (e) => {
      console.log(e);
      common_vendor.index.createSelectorQuery().in(instance).select("#nickname-input").fields({
        properties: ["value"]
      }).exec((res) => {
        var _a, _b;
        console.log(res);
        nickName.value = (_a = res == null ? void 0 : res[0]) == null ? void 0 : _a.value;
        console.log("\u6635\u79F0", nickName.value);
        api_user.saveOrUpdateApi({
          openid: common_vendor.index.getStorageSync("openid"),
          nickName: (_b = res == null ? void 0 : res[0]) == null ? void 0 : _b.value
        }).then((res2) => {
          var _a2;
          console.log(res2);
          ustore.nickName = (_a2 = res2 == null ? void 0 : res2[0]) == null ? void 0 : _a2.value;
        });
      });
    };
    const toOrder = () => {
      common_vendor.index.navigateTo({
        url: "../order/order"
      });
    };
    const toAddress = () => {
      common_vendor.index.navigateTo({
        url: "../addresslist/addresslist"
      });
    };
    const toCollect = () => {
      common_vendor.index.navigateTo({
        url: "../collect/collect"
      });
    };
    common_vendor.onShow(() => {
      api_user.userLogin();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.o(onChooseAvatar),
        c: common_vendor.o(onNickName),
        d: common_vendor.unref(nickName),
        e: common_vendor.o(($event) => common_vendor.isRef(nickName) ? nickName.value = $event.detail.value : null),
        f: common_vendor.o(toOrder),
        g: common_vendor.p({
          icon: "star",
          title: "\u6211\u7684\u8BA2\u5355"
        }),
        h: common_vendor.o(toCollect),
        i: common_vendor.p({
          icon: "photo",
          title: "\u6211\u7684\u6536\u85CF"
        }),
        j: common_vendor.o(toAddress),
        k: common_vendor.p({
          icon: "coupon",
          title: "\u6211\u7684\u5730\u5740"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
