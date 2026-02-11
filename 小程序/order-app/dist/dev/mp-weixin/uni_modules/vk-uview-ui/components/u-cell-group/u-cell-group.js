"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-cell-group",
  props: {
    title: {
      type: String,
      default: ""
    },
    border: {
      type: Boolean,
      default: true
    },
    titleStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      index: 0
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.title
  }, $props.title ? {
    b: common_vendor.t($props.title),
    c: common_vendor.s($props.titleStyle)
  } : {}, {
    d: $props.border ? 1 : ""
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-53f69c96"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.vue"]]);
wx.createComponent(Component);
