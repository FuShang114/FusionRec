"use strict";
var common_vendor = require("../../common/vendor.js");
var api_home = require("../../api/home.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u_lazy_load2 = common_vendor.resolveComponent("u-lazy-load");
  const _easycom_u_waterfall2 = common_vendor.resolveComponent("u-waterfall");
  (_easycom_u_divider2 + _easycom_u_lazy_load2 + _easycom_u_waterfall2)();
}
const _easycom_u_divider = () => "../../uni_modules/vk-uview-ui/components/u-divider/u-divider.js";
const _easycom_u_lazy_load = () => "../../uni_modules/vk-uview-ui/components/u-lazy-load/u-lazy-load.js";
const _easycom_u_waterfall = () => "../../uni_modules/vk-uview-ui/components/u-waterfall/u-waterfall.js";
if (!Math) {
  (_easycom_u_divider + _easycom_u_lazy_load + _easycom_u_waterfall)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const carimg = common_vendor.ref("/static/goodscar.png");
    common_vendor.ref("400");
    const indicatorDots = common_vendor.ref(true);
    const autoplay = common_vendor.ref(true);
    const interval = common_vendor.ref(2e3);
    const duration = common_vendor.ref(500);
    const swiperList = common_vendor.ref([]);
    const flowList = common_vendor.ref([]);
    const getSwipperList = async () => {
      let res = await api_home.getSwipperListApi();
      if (res && res.code == 200) {
        swiperList.value = res.data;
      }
    };
    const getHotList = async () => {
      let res = await api_home.getHotListApi();
      if (res && res.code == 200) {
        flowList.value = res.data;
      }
    };
    const toDetails = (item) => {
      console.log(item);
      common_vendor.index.navigateTo({
        url: "../detail/detail?goods=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    common_vendor.onLoad(() => {
      getSwipperList();
      getHotList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swiperList.value, (item, index, i0) => {
          return {
            a: item.images.split(",")[0],
            b: common_vendor.o(($event) => toDetails(item.sysGoods), index),
            c: index
          };
        }),
        b: indicatorDots.value,
        c: autoplay.value,
        d: interval.value,
        e: duration.value,
        f: common_vendor.p({
          ["margin-top"]: "20",
          ["margin-bottom"]: "20",
          color: "#F3AF28"
        }),
        g: common_vendor.w(({
          leftList
        }, s0, i0) => {
          return {
            a: common_vendor.f(leftList, (item, index, i1) => {
              return {
                a: common_vendor.o(($event) => toDetails(item)),
                b: "48178ad7-2-" + i0 + "-" + i1 + ",48178ad7-1",
                c: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.goodsImage.split(",")[0],
                  index
                }),
                d: common_vendor.t(item.goodsName),
                e: common_vendor.t(item.specs[0].goodsPrice),
                f: common_vendor.o(($event) => toDetails(item)),
                g: index
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "left",
          path: "g",
          vueId: "48178ad7-1"
        }),
        h: carimg.value,
        i: common_vendor.w(({
          rightList
        }, s0, i0) => {
          return {
            a: common_vendor.f(rightList, (item, index, i1) => {
              return {
                a: common_vendor.o(($event) => toDetails(item)),
                b: "48178ad7-3-" + i0 + "-" + i1 + ",48178ad7-1",
                c: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.goodsImage.split(",")[0],
                  index
                }),
                d: common_vendor.t(item.goodsName),
                e: common_vendor.t(item.specs[0].goodsPrice),
                f: common_vendor.o(($event) => toDetails(item)),
                g: index
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "right",
          path: "i",
          vueId: "48178ad7-1"
        }),
        j: carimg.value,
        k: common_vendor.sr("uWaterfall", "48178ad7-1"),
        l: common_vendor.o(($event) => flowList.value = $event),
        m: common_vendor.p({
          modelValue: flowList.value
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
