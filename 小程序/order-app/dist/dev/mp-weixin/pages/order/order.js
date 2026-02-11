"use strict";
var common_vendor = require("../../common/vendor.js");
var api_order = require("../../api/order.js");
var api_user = require("../../api/user.js");
require("../../common/http.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_u_tabs_swiper2 = common_vendor.resolveComponent("u-tabs-swiper");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_u_tabs_swiper2 + _easycom_u_icon2 + _easycom_u_loadmore2 + _easycom_u_modal2)();
}
const _easycom_u_tabs_swiper = () => "../../uni_modules/vk-uview-ui/components/u-tabs-swiper/u-tabs-swiper.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
const _easycom_u_modal = () => "../../uni_modules/vk-uview-ui/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_u_tabs_swiper + _easycom_u_icon + _easycom_u_loadmore + _easycom_u_modal)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const show = common_vendor.ref(false);
    const orderId = common_vendor.ref("");
    const commentText = common_vendor.ref("");
    const commentBtn = (item) => {
      orderId.value = item.orderId;
      show.value = true;
    };
    const tabs = common_vendor.ref(null);
    const orderList = common_vendor.ref([
      [],
      [],
      [],
      []
    ]);
    const list = common_vendor.ref([
      {
        name: "\u5168\u90E8"
      },
      {
        name: "\u5F85\u53D1\u8D27"
      },
      {
        name: "\u5DF2\u53D1\u8D27"
      },
      {
        name: "\u5DF2\u6536\u8D27"
      }
    ]);
    const currents = common_vendor.ref(0);
    const swiperCurrent = common_vendor.ref(0);
    common_vendor.ref(0);
    common_vendor.ref(0);
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(3);
    const pages = common_vendor.ref(0);
    const loadStatus = common_vendor.ref(["loadmore", "loadmore", "loadmore", "loadmore"]);
    const reachBottom = () => {
      if (currents.value != 2) {
        loadStatus.value.splice(currents.value, 1, "loading");
        setTimeout(() => {
          if (currentPage.value < pages.value) {
            currentPage.value = ++currentPage.value;
            getOrderList(currents.value);
          } else {
            loadStatus.value.splice(currents.value, 1, "nomore");
          }
        }, 1e3);
      }
    };
    const change = (index) => {
      loadStatus.value.splice(index, 1, "loading");
      swiperCurrent.value = index;
      currentPage.value = 1;
      pages.value = 0;
      orderList.value[currents.value] = [];
    };
    const transition = ({ detail: { dx } }) => {
      tabs.value.setDx(dx);
    };
    const animationfinish = ({ detail: { current } }) => {
      console.log(current);
      console.log(currents.value);
      tabs.value.setFinishCurrent(current);
      swiperCurrent.value = current;
      currents.value = current;
      currentPage.value = 1;
      pages.value = 0;
      orderList.value[currents.value] = [];
      getOrderList(current);
    };
    const getOrderList = async (idx) => {
      let res = await api_order.getOrderListApi({
        openid: common_vendor.index.getStorageSync("openid"),
        type: idx == 0 ? "" : idx - 1,
        currentPage: currentPage.value,
        pageSize: pageSize.value
      });
      if (res && res.code == 200) {
        console.log(res);
        if (res.data.records.length == 0) {
          loadStatus.value.splice(currents.value, 1, "nomore");
          return;
        }
        pages.value = res.data.pages;
        res.data.records.map((item) => {
          orderList.value[idx].push(item);
        });
        if (res.data.total == pages.value) {
          loadStatus.value.splice(currents.value, 1, "nomore");
        } else {
          loadStatus.value.splice(currents.value, 1, "loadmore");
        }
      } else {
        loadStatus.value.splice(currents.value, 1, "nomore");
      }
    };
    const cancel = (item, index) => {
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u786E\u5B9A\u53D6\u6D88\u8BA2\u5355\u5417\uFF1F",
        success: async function(res) {
          if (res.confirm) {
            console.log("\u7528\u6237\u70B9\u51FB\u786E\u5B9A");
            console.log(item);
            let res2 = await api_order.cancelOrderApi({
              orderId: item.orderId
            });
            if (res2 && res2.code == 200) {
              change(swiperCurrent.value);
              getOrderList(swiperCurrent.value);
            }
          } else if (res.cancel) {
            console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
          }
        }
      });
    };
    const confirmOrderBtn = (item, index) => {
      console.log(index);
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: "\u786E\u5B9A\u6536\u8D27\u5417\uFF1F",
        success: async function(res) {
          if (res.confirm) {
            console.log("\u7528\u6237\u70B9\u51FB\u786E\u5B9A\u6536\u8D27");
            console.log(item);
            let res2 = await api_order.confirmOrderApi({
              orderId: item.orderId
            });
            if (res2 && res2.code == 200) {
              change(swiperCurrent.value);
              getOrderList(swiperCurrent.value);
            }
          } else if (res.cancel) {
            console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
          }
        }
      });
    };
    const confirmBtn = async () => {
      console.log("\u786E\u5B9A");
      if (!commentText.value) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u586B\u5199\u8BC4\u8BBA"
        });
        return;
      }
      let res = await api_user.addCommentApi({
        orderId: orderId.value,
        openid: common_vendor.index.getStorageSync("openid"),
        commentText: commentText.value
      });
      if (res && res.code == 200) {
        show.value = false;
      }
    };
    const cancelBtn = () => {
      console.log("\u53D6\u6D88");
      show.value = false;
    };
    common_vendor.onReady(() => {
      getOrderList(0);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(tabs, "59b7fbf9-0", {
          "k": "tabs"
        }),
        b: common_vendor.o(change),
        c: common_vendor.p({
          activeColor: "#f29100",
          list: list.value,
          current: currents.value,
          ["is-scroll"]: false,
          swiperWidth: "750"
        }),
        d: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.f(orderList.value[index], (res, index2, i1) => {
              return common_vendor.e({
                a: "59b7fbf9-1-" + i0 + "-" + i1,
                b: common_vendor.t(res.userName),
                c: "59b7fbf9-2-" + i0 + "-" + i1,
                d: common_vendor.t(res.phone),
                e: common_vendor.t(res.address),
                f: common_vendor.f(res.goodsList, (item2, index3, i2) => {
                  return {
                    a: item2.goodsImage.split(",")[0],
                    b: common_vendor.t(item2.goodsName),
                    c: common_vendor.t(item2.specsName),
                    d: common_vendor.t(item2.goodsUnit),
                    e: common_vendor.t(item2.price),
                    f: common_vendor.t(item2.num),
                    g: index3
                  };
                }),
                g: common_vendor.t(res.goodsList.length),
                h: common_vendor.t(res.price),
                i: res.status == "0"
              }, res.status == "0" ? {
                j: common_vendor.o(($event) => cancel(res))
              } : {}, {
                k: res.status == "1"
              }, res.status == "1" ? {
                l: common_vendor.o(($event) => confirmOrderBtn(res, index2))
              } : {}, {
                m: res.status == "2"
              }, res.status == "2" ? {
                n: common_vendor.o(($event) => commentBtn(res))
              } : {}, {
                o: res.id
              });
            }),
            b: "59b7fbf9-3-" + i0,
            c: common_vendor.p({
              status: loadStatus.value[index],
              bgColor: "#f2f2f2"
            }),
            d: index
          };
        }),
        e: common_vendor.p({
          name: "home",
          size: 30,
          color: "rgb(94,94,94)"
        }),
        f: common_vendor.p({
          name: "arrow-right",
          color: "rgb(203,203,203)",
          size: 26
        }),
        g: common_vendor.o(reachBottom),
        h: swiperCurrent.value,
        i: common_vendor.o(transition),
        j: common_vendor.o(animationfinish),
        k: commentText.value,
        l: common_vendor.o(($event) => commentText.value = $event.detail.value),
        m: common_vendor.o(confirmBtn),
        n: common_vendor.o(cancelBtn),
        o: common_vendor.o(($event) => show.value = $event),
        p: common_vendor.p({
          ["confirm-color"]: "#F3AF28",
          ["content-style"]: {
            padding: "10px"
          },
          ["show-cancel-button"]: true,
          title: "\u8BC4\u8BBA",
          zoom: false,
          modelValue: show.value
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-59b7fbf9"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
