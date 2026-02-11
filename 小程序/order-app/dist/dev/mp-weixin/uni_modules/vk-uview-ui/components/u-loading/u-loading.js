"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-loading",
  props: {
    mode: {
      type: String,
      default: "circle"
    },
    color: {
      type: String,
      default: "#c7c7c7"
    },
    size: {
      type: [String, Number],
      default: "34"
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cricleStyle() {
      let style = {};
      style.width = this.size + "rpx";
      style.height = this.size + "rpx";
      if (this.mode == "circle")
        style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${this.color ? this.color : "#c7c7c7"}`;
      return style;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {
    b: common_vendor.n($props.mode == "circle" ? "u-loading-circle" : "u-loading-flower"),
    c: common_vendor.s($options.cricleStyle)
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-35d0dd20"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/uni_modules/vk-uview-ui/components/u-loading/u-loading.vue"]]);
wx.createComponent(Component);
