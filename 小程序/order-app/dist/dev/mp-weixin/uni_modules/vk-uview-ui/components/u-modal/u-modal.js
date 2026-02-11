"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-modal",
  emits: ["update:modelValue", "input", "confirm", "cancel"],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: ""
    },
    title: {
      type: [String],
      default: "\u63D0\u793A"
    },
    width: {
      type: [Number, String],
      default: 600
    },
    content: {
      type: String,
      default: "\u5185\u5BB9"
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "\u786E\u8BA4"
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    confirmColor: {
      type: String,
      default: "#2979ff"
    },
    cancelColor: {
      type: String,
      default: "#606266"
    },
    borderRadius: {
      type: [Number, String],
      default: 16
    },
    titleStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    contentStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    cancelStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    confirmStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    zoom: {
      type: Boolean,
      default: true
    },
    asyncClose: {
      type: Boolean,
      default: false
    },
    maskCloseAble: {
      type: Boolean,
      default: false
    },
    negativeTop: {
      type: [String, Number],
      default: 0
    },
    blur: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      popupValue: false
    };
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    cancelBtnStyle() {
      return Object.assign(
        {
          color: this.cancelColor
        },
        this.cancelStyle
      );
    },
    confirmBtnStyle() {
      return Object.assign(
        {
          color: this.confirmColor
        },
        this.confirmStyle
      );
    },
    uZIndex() {
      return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
    }
  },
  watch: {
    valueCom(n) {
      if (n === true)
        this.loading = false;
      this.popupValue = n;
    }
  },
  methods: {
    confirm() {
      if (this.asyncClose) {
        this.loading = true;
      } else {
        this.$emit("input", false);
        this.$emit("update:modelValue", false);
      }
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
      this.$emit("input", false);
      this.$emit("update:modelValue", false);
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    popupClose() {
      this.$emit("input", false);
      this.$emit("update:modelValue", false);
    },
    clearLoading() {
      this.loading = false;
    }
  }
};
if (!Array) {
  const _easycom_u_loading2 = common_vendor.resolveComponent("u-loading");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_loading2 + _easycom_u_popup2)();
}
const _easycom_u_loading = () => "../u-loading/u-loading.js";
const _easycom_u_popup = () => "../u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_loading + _easycom_u_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showTitle
  }, $props.showTitle ? {
    b: common_vendor.t($props.title),
    c: common_vendor.s($props.titleStyle)
  } : {}, {
    d: _ctx.$slots.default || _ctx.$slots.$default
  }, _ctx.$slots.default || _ctx.$slots.$default ? {
    e: common_vendor.s($props.contentStyle)
  } : {
    f: common_vendor.t($props.content),
    g: common_vendor.s($props.contentStyle)
  }, {
    h: $props.showCancelButton || $props.showConfirmButton
  }, $props.showCancelButton || $props.showConfirmButton ? common_vendor.e({
    i: $props.showCancelButton
  }, $props.showCancelButton ? {
    j: common_vendor.t($props.cancelText),
    k: common_vendor.s($options.cancelBtnStyle),
    l: common_vendor.o((...args) => $options.cancel && $options.cancel(...args))
  } : {}, {
    m: $props.showConfirmButton || _ctx.$slots["confirm-button"]
  }, $props.showConfirmButton || _ctx.$slots["confirm-button"] ? common_vendor.e({
    n: _ctx.$slots["confirm-button"]
  }, _ctx.$slots["confirm-button"] ? {} : common_vendor.e({
    o: $data.loading
  }, $data.loading ? {
    p: common_vendor.p({
      mode: "circle",
      color: $props.confirmColor
    })
  } : {
    q: common_vendor.t($props.confirmText)
  }), {
    r: $props.asyncClose ? "none" : "u-model__btn--hover",
    s: common_vendor.s($options.confirmBtnStyle),
    t: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  }) : {}) : {}, {
    v: common_vendor.o($options.popupClose),
    w: common_vendor.o(($event) => $data.popupValue = $event),
    x: common_vendor.p({
      blur: $props.blur,
      zoom: $props.zoom,
      mode: "center",
      popup: false,
      ["z-index"]: $options.uZIndex,
      length: $props.width,
      ["mask-close-able"]: $props.maskCloseAble,
      ["border-radius"]: $props.borderRadius,
      ["negative-top"]: $props.negativeTop,
      modelValue: $data.popupValue
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c2027a7c"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/uni_modules/vk-uview-ui/components/u-modal/u-modal.vue"]]);
wx.createComponent(Component);
