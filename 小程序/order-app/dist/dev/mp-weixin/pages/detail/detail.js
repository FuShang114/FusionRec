"use strict";
var common_vendor = require("../../common/vendor.js");
var common_http = require("../../common/http.js");
var store_car = require("../../store/car.js");
var api_order = require("../../api/order.js");
var store_order = require("../../store/order.js");
var api_user = require("../../api/user.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_parse2 = common_vendor.resolveComponent("u-parse");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_badge2 = common_vendor.resolveComponent("u-badge");
  (_easycom_u_swiper2 + _easycom_u_parse2 + _easycom_u_icon2 + _easycom_u_badge2)();
}
const _easycom_u_swiper = () => "../../uni_modules/vk-uview-ui/components/u-swiper/u-swiper.js";
const _easycom_u_parse = () => "../../uni_modules/vk-uview-ui/components/u-parse/u-parse.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_badge = () => "../../uni_modules/vk-uview-ui/components/u-badge/u-badge.js";
if (!Math) {
  (_easycom_u_swiper + _easycom_u_parse + _easycom_u_icon + _easycom_u_badge)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const store = store_car.carStore();
    const ostore = store_order.orderStore();
    const carCount = common_vendor.computed$1(() => {
      return store.carList.length;
    });
    const hasCollect = common_vendor.ref("0");
    const content = common_vendor.ref("");
    const current = common_vendor.ref(0);
    const height = common_vendor.ref("400");
    common_vendor.ref(true);
    common_vendor.ref(true);
    const interval = common_vendor.ref(2e3);
    const duration = common_vendor.ref(500);
    common_vendor.ref([]);
    const swipperList = common_vendor.ref([]);
    const title = common_vendor.ref("");
    const price = common_vendor.ref(0);
    const goodsUnit = common_vendor.ref("");
    const carData = common_vendor.ref({
      flag: true,
      goodsName: "",
      goodsUnit: "",
      goodsId: "",
      num: 1,
      specsName: "",
      price: "",
      goodsImage: ""
    });
    const specs = common_vendor.ref([]);
    const commentList = common_vendor.ref();
    const change = (index, item) => {
      current.value = index;
      price.value = item.goodsPrice;
      carData.value.price = item.goodsPrice;
      carData.value.specsName = item.specsName;
    };
    const getCommentList = async () => {
      let res = await api_order.commentListApi({
        goodsId: carData.value.goodsId
      });
      console.log(res);
      if (res && res.code == 200) {
        commentList.value = res.data;
      }
    };
    const swiperCurrent = common_vendor.ref(0);
    common_vendor.ref(0);
    const tabIndex = common_vendor.ref(0);
    const swiperHeight = common_vendor.ref(0);
    const currentIndex = common_vendor.ref(0);
    const setSwiperHeight = () => {
      let element = "#content-wrap" + currentIndex.value;
      let query = common_vendor.index.createSelectorQuery().in(instance);
      query.select(element).boundingClientRect();
      query.exec((res) => {
        console.log(res);
        if (res && res[0]) {
          swiperHeight.value = res[0].height;
        }
      });
    };
    const tabClick = (index) => {
      tabIndex.value = index;
      swiperCurrent.value = index;
      currentIndex.value = index;
      setSwiperHeight();
    };
    const addCar = () => {
      store.addCar(carData.value);
    };
    const addBuy = () => {
      ostore.orderList = [];
      ostore.addOrder(carData.value);
      common_vendor.index.navigateTo({
        url: "../confirm/confirm"
      });
    };
    const animationfinish = ({
      detail: {
        current: current2
      }
    }) => {
      console.log(current2);
      swiperCurrent.value = current2;
      tabIndex.value = current2;
    };
    const toHome = () => {
      common_vendor.index.switchTab({
        url: "../index/index"
      });
    };
    const toCar = () => {
      common_vendor.index.switchTab({
        url: "../car/car"
      });
    };
    const toCollect = async () => {
      if (hasCollect.value == "0") {
        let res = await api_order.addCollectApi({
          openid: common_vendor.index.getStorageSync("openid"),
          goodsId: carData.value.goodsId
        });
        if (res && res.code == 200) {
          hasCollectMeth();
          common_vendor.index.showToast({
            icon: "none",
            title: res.msg
          });
        }
      } else {
        let res = await api_order.cancelCollectApi({
          openid: common_vendor.index.getStorageSync("openid"),
          goodsId: carData.value.goodsId
        });
        if (res && res.code == 200) {
          hasCollectMeth();
          common_vendor.index.showToast({
            icon: "none",
            title: res.msg
          });
        }
      }
    };
    const hasCollectMeth = async () => {
      let res = await api_order.hasCollectApi({
        openid: common_vendor.index.getStorageSync("openid"),
        goodsId: carData.value.goodsId
      });
      console.log(res);
      if (res.data && res.data == "1") {
        hasCollect.value = "1";
      } else {
        hasCollect.value = "0";
      }
    };
    common_vendor.onLoad((options) => {
      api_user.userLogin();
      const goods = JSON.parse(decodeURIComponent(options.goods));
      swipperList.value = goods.goodsImage.split(",");
      console.log(goods);
      goodsUnit.value = goods.goodsUnit;
      title.value = goods.goodsName;
      price.value = goods.specs[0].goodsPrice;
      specs.value = goods.specs;
      content.value = goods.goodsDesc;
      carData.value.goodsId = goods.goodsId;
      carData.value.goodsName = goods.goodsName;
      carData.value.goodsUnit = goods.goodsUnit;
      carData.value.specsName = goods.specs[0].specsName;
      carData.value.price = goods.specs[0].goodsPrice;
      carData.value.goodsImage = goods.goodsImage.split(",")[0];
      hasCollectMeth();
      getCommentList();
      common_vendor.nextTick(() => {
        setSwiperHeight();
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: "images",
          ["border-radius"]: "1",
          duration: duration.value,
          interval: interval.value,
          height: height.value,
          list: swipperList.value
        }),
        b: common_vendor.t(title.value),
        c: common_vendor.t(price.value),
        d: common_vendor.t(goodsUnit.value),
        e: common_vendor.f(specs.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.specsName),
            b: common_vendor.o(($event) => change(index, item)),
            c: current.value === index ? 1 : ""
          };
        }),
        f: common_vendor.o(($event) => tabClick(0)),
        g: common_vendor.n(tabIndex.value == 0 ? "item-active" : "item"),
        h: common_vendor.o(($event) => tabClick(1)),
        i: common_vendor.n(tabIndex.value == 1 ? "item-active" : "item"),
        j: common_vendor.p({
          html: content.value
        }),
        k: common_vendor.f(commentList.value, (res, index, i0) => {
          return {
            a: common_vendor.unref(common_http.http).baseUrl + res.avatarUrl,
            b: common_vendor.t(res.nickName),
            c: common_vendor.t(res.commentText),
            d: common_vendor.t(res.createTime),
            e: res.id
          };
        }),
        l: swiperCurrent.value,
        m: common_vendor.o(animationfinish),
        n: common_vendor.p({
          name: "home",
          size: 40,
          color: _ctx.$u.color["contentColor"]
        }),
        o: common_vendor.o(toHome),
        p: hasCollect.value == "1"
      }, hasCollect.value == "1" ? {
        q: common_vendor.p({
          color: "#F3AF28",
          size: 40,
          name: "star"
        })
      } : {}, {
        r: hasCollect.value == "0"
      }, hasCollect.value == "0" ? {
        s: common_vendor.p({
          size: 40,
          name: "star"
        })
      } : {}, {
        t: common_vendor.o(toCollect),
        v: common_vendor.p({
          count: common_vendor.unref(carCount),
          type: "error",
          offset: [-3, -6]
        }),
        w: common_vendor.p({
          name: "shopping-cart",
          size: 40,
          color: _ctx.$u.color["contentColor"]
        }),
        x: common_vendor.o(toCar),
        y: common_vendor.o(addCar),
        z: common_vendor.o(addBuy)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5ee9087b"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
