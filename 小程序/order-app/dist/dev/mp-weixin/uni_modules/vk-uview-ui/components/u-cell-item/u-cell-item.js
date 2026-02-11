"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-cell-item",
  emits: ["click"],
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: [String, Number],
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: [String, Number],
      default: ""
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    borderTop: {
      type: Boolean,
      default: false
    },
    hoverClass: {
      type: String,
      default: "u-cell-hover"
    },
    arrow: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    titleWidth: {
      type: [Number, String],
      default: ""
    },
    arrowDirection: {
      type: String,
      default: "right"
    },
    titleStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    valueStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    labelStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    bgColor: {
      type: String,
      default: "transparent"
    },
    index: {
      type: [String, Number],
      default: ""
    },
    useLabelSlot: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: [Number, String],
      default: 34
    },
    iconStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    arrowStyle() {
      let style = {};
      if (this.arrowDirection == "up")
        style.transform = "rotate(-90deg)";
      else if (this.arrowDirection == "down")
        style.transform = "rotate(90deg)";
      else
        style.transform = "rotate(0deg)";
      return style;
    }
  },
  methods: {
    click() {
      this.$emit("click", this.index);
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.icon
  }, $props.icon ? {
    b: common_vendor.p({
      size: $props.iconSize,
      name: $props.icon,
      ["custom-style"]: $props.iconStyle
    })
  } : {}, {
    c: $props.title !== ""
  }, $props.title !== "" ? {
    d: common_vendor.t($props.title)
  } : {}, {
    e: $props.label || _ctx.$slots.label
  }, $props.label || _ctx.$slots.label ? common_vendor.e({
    f: $props.label !== ""
  }, $props.label !== "" ? {
    g: common_vendor.t($props.label)
  } : {}, {
    h: common_vendor.s($props.labelStyle)
  }) : {}, {
    i: common_vendor.s({
      width: $props.titleWidth ? $props.titleWidth + "rpx" : "auto"
    }),
    j: common_vendor.s($props.titleStyle),
    k: $props.value !== ""
  }, $props.value !== "" ? {
    l: common_vendor.t($props.value)
  } : {}, {
    m: common_vendor.s($props.valueStyle),
    n: _ctx.$slots["right-icon"]
  }, _ctx.$slots["right-icon"] ? {} : {}, {
    o: $props.arrow
  }, $props.arrow ? {
    p: common_vendor.s($options.arrowStyle),
    q: common_vendor.p({
      name: "arrow-right"
    })
  } : {}, {
    r: common_vendor.o((...args) => $options.click && $options.click(...args)),
    s: $props.borderBottom ? 1 : "",
    t: $props.borderTop ? 1 : "",
    v: $props.center ? 1 : "",
    w: $props.required ? 1 : "",
    x: $props.hoverClass,
    y: $props.bgColor
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-09d67224"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.vue"]]);
wx.createComponent(Component);
