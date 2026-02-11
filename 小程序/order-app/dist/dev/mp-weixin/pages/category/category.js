"use strict";
var common_vendor = require("../../common/vendor.js");
var api_category = require("../../api/category.js");
require("../../common/http.js");
const _sfc_main = {
  __name: "category",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const tabbar = common_vendor.ref([]);
    const scrollTop = common_vendor.ref(0);
    const current = common_vendor.ref(0);
    const menuHeight = common_vendor.ref(0);
    const menuItemHeight = common_vendor.ref(0);
    const swichMenu = async (index) => {
      if (index == current.value)
        return;
      current.value = index;
      if (menuHeight.value == 0 || menuItemHeight.value == 0) {
        await getElRect("menu-scroll-view", "menuHeight");
        await getElRect("u-tab-item", "menuItemHeight");
      }
      scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2;
    };
    const getElRect = (elClass, dataVal) => {
      new Promise((resolve, reject) => {
        const query = common_vendor.index.createSelectorQuery().in(instance);
        query.select("." + elClass).fields({ size: true }, (res) => {
          if (!res) {
            setTimeout(() => {
              getElRect(elClass);
            }, 10);
            return;
          }
          instance[dataVal] = res.height;
        }).exec();
      });
    };
    const getCategoryList = async () => {
      let res = await api_category.getCategoryListApi();
      if (res && res.code == 200) {
        tabbar.value = res.data;
      }
    };
    const toDetails = (item) => {
      common_vendor.index.navigateTo({
        url: "../detail/detail?goods=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    common_vendor.onLoad(() => {
      getCategoryList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabbar.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.categoryName),
            b: index,
            c: common_vendor.n(current.value == index ? "u-tab-item-active" : ""),
            d: index,
            e: common_vendor.o(($event) => swichMenu(index), index)
          };
        }),
        b: scrollTop.value,
        c: common_vendor.f(tabbar.value, (item, index, i0) => {
          return common_vendor.e({
            a: current.value == index
          }, current.value == index ? {
            b: common_vendor.f(item.goods, (item1, index1, i1) => {
              return {
                a: common_vendor.o(($event) => toDetails(item1)),
                b: item1.goodsImage.split(",")[0],
                c: common_vendor.t(item1.goodsName),
                d: index1
              };
            })
          } : {}, {
            c: index
          });
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c56ccca"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
