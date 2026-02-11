"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-swiper",
  emits: ["click", "change"],
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: Boolean,
      default: false
    },
    indicator: {
      type: Object,
      default() {
        return {};
      }
    },
    borderRadius: {
      type: [Number, String],
      default: 8
    },
    interval: {
      type: [String, Number],
      default: 3e3
    },
    mode: {
      type: String,
      default: "round"
    },
    height: {
      type: [Number, String],
      default: 250
    },
    indicatorPos: {
      type: String,
      default: "bottomCenter"
    },
    effect3d: {
      type: Boolean,
      default: false
    },
    effect3dPreviousMargin: {
      type: [Number, String],
      default: 50
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 500
    },
    circular: {
      type: Boolean,
      default: true
    },
    imgMode: {
      type: String,
      default: "aspectFill"
    },
    name: {
      type: String,
      default: "image"
    },
    bgColor: {
      type: String,
      default: "#f3f4f6"
    },
    current: {
      type: [Number, String],
      default: 0
    },
    titleStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    list(nVal, oVal) {
      if (nVal.length !== oVal.length)
        this.uCurrent = 0;
    },
    current(n) {
      this.uCurrent = n;
    }
  },
  data() {
    return {
      uCurrent: this.current
    };
  },
  computed: {
    justifyContent() {
      if (this.indicatorPos == "topLeft" || this.indicatorPos == "bottomLeft")
        return "flex-start";
      if (this.indicatorPos == "topCenter" || this.indicatorPos == "bottomCenter")
        return "center";
      if (this.indicatorPos == "topRight" || this.indicatorPos == "bottomRight")
        return "flex-end";
    },
    titlePaddingBottom() {
      let tmp = 0;
      if (this.mode == "none")
        return "12rpx";
      if (["bottomLeft", "bottomCenter", "bottomRight"].indexOf(this.indicatorPos) >= 0 && this.mode == "number") {
        tmp = "60rpx";
      } else if (["bottomLeft", "bottomCenter", "bottomRight"].indexOf(this.indicatorPos) >= 0 && this.mode != "number") {
        tmp = "40rpx";
      } else {
        tmp = "12rpx";
      }
      return tmp;
    },
    elCurrent() {
      return Number(this.current);
    }
  },
  methods: {
    listClick(index) {
      this.$emit("click", index);
    },
    change(e) {
      let current = e.detail.current;
      this.uCurrent = current;
      this.$emit("change", current);
    },
    animationfinish(e) {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: item[$props.name] || item,
        b: $props.title && item.title
      }, $props.title && item.title ? {
        c: common_vendor.t(item.title),
        d: common_vendor.s({
          "padding-bottom": $options.titlePaddingBottom
        }),
        e: common_vendor.s($props.titleStyle)
      } : {}, {
        f: common_vendor.o(($event) => $options.listClick(index)),
        g: common_vendor.n($data.uCurrent != index ? "u-list-scale" : ""),
        h: $props.effect3d && $data.uCurrent != index ? "scaleY(0.9)" : "scaleY(1)",
        i: $props.effect3d && $data.uCurrent != index ? "0 20rpx" : 0,
        j: index
      });
    }),
    b: $props.imgMode,
    c: `${$props.borderRadius}rpx`,
    d: $options.elCurrent,
    e: common_vendor.o((...args) => $options.change && $options.change(...args)),
    f: common_vendor.o((...args) => $options.animationfinish && $options.animationfinish(...args)),
    g: $props.interval,
    h: $props.circular,
    i: $props.duration,
    j: $props.autoplay,
    k: $props.effect3d ? $props.effect3dPreviousMargin + "rpx" : "0",
    l: $props.effect3d ? $props.effect3dPreviousMargin + "rpx" : "0",
    m: $props.height + "rpx",
    n: $props.bgColor,
    o: $props.mode == "rect"
  }, $props.mode == "rect" ? {
    p: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: index == $data.uCurrent ? 1 : "",
        b: index
      };
    })
  } : {}, {
    q: $props.mode == "dot"
  }, $props.mode == "dot" ? {
    r: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: index == $data.uCurrent ? 1 : "",
        b: index
      };
    })
  } : {}, {
    s: $props.mode == "round"
  }, $props.mode == "round" ? {
    t: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: index == $data.uCurrent ? 1 : "",
        b: index
      };
    })
  } : {}, {
    v: $props.mode == "number"
  }, $props.mode == "number" ? {
    w: common_vendor.t($data.uCurrent + 1),
    x: common_vendor.t($props.list.length)
  } : {}, {
    y: $props.indicatorPos == "topLeft" || $props.indicatorPos == "topCenter" || $props.indicatorPos == "topRight" ? "12rpx" : "auto",
    z: $props.indicatorPos == "bottomLeft" || $props.indicatorPos == "bottomCenter" || $props.indicatorPos == "bottomRight" ? "12rpx" : "auto",
    A: $options.justifyContent,
    B: `0 ${$props.effect3d ? "74rpx" : "24rpx"}`,
    C: `${$props.borderRadius}rpx`
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3f243d96"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/uni_modules/vk-uview-ui/components/u-swiper/u-swiper.vue"]]);
wx.createComponent(Component);
