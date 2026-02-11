"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-waterfall",
  emits: ["update:modelValue", "input"],
  props: {
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    modelValue: {
      type: Array,
      default: function() {
        return [];
      }
    },
    addTime: {
      type: [Number, String],
      default: 200
    },
    idKey: {
      type: String,
      default: "id"
    }
  },
  data() {
    return {
      leftList: [],
      rightList: [],
      tempList: [],
      children: []
    };
  },
  watch: {
    copyFlowList(nVal, oVal) {
      let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
      this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
      this.splitData();
    }
  },
  mounted() {
    this.tempList = this.cloneData(this.copyFlowList);
    this.splitData();
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    copyFlowList() {
      return this.cloneData(this.valueCom);
    }
  },
  methods: {
    async splitData() {
      if (!this.tempList.length)
        return;
      let leftRect = await this.$uGetRect("#u-left-column");
      let rightRect = await this.$uGetRect("#u-right-column");
      let item = this.tempList[0];
      if (!item)
        return;
      if (leftRect.height < rightRect.height) {
        this.leftList.push(item);
      } else if (leftRect.height > rightRect.height) {
        this.rightList.push(item);
      } else {
        if (this.leftList.length <= this.rightList.length) {
          this.leftList.push(item);
        } else {
          this.rightList.push(item);
        }
      }
      this.tempList.splice(0, 1);
      if (this.tempList.length) {
        setTimeout(() => {
          this.splitData();
        }, this.addTime);
      }
    },
    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    },
    clear() {
      this.leftList = [];
      this.rightList = [];
      this.$emit("input", []);
      this.$emit("update:modelValue", []);
      this.tempList = [];
    },
    remove(id) {
      let index = -1;
      index = this.leftList.findIndex((val) => val[this.idKey] == id);
      if (index != -1) {
        this.leftList.splice(index, 1);
      } else {
        index = this.rightList.findIndex((val) => val[this.idKey] == id);
        if (index != -1)
          this.rightList.splice(index, 1);
      }
      index = this.value.findIndex((val) => val[this.idKey] == id);
      if (index != -1) {
        this.$emit("input", this.valueCom.splice(index, 1));
        this.$emit("update:modelValue", this.valueCom.splice(index, 1));
      }
    },
    modify(id, key, value) {
      let index = -1;
      index = this.leftList.findIndex((val) => val[this.idKey] == id);
      if (index != -1) {
        this.leftList[index][key] = value;
      } else {
        index = this.rightList.findIndex((val) => val[this.idKey] == id);
        if (index != -1)
          this.rightList[index][key] = value;
      }
      index = this.valueCom.findIndex((val) => val[this.idKey] == id);
      if (index != -1) {
        let data = this.cloneData(this.valueCom);
        data[index][key] = value;
        this.$emit("input", data);
        this.$emit("update:modelValue", data);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.r("left", {
      leftList: $data.leftList
    }),
    b: common_vendor.r("right", {
      rightList: $data.rightList
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-349a3de8"], ["__file", "D:/\u6E90\u7801b/\u5FAE\u4FE1\u70B9\u9910\u5C0F\u7A0B\u5E8F/\u6E90\u7801/\u5C0F\u7A0B\u5E8F/order-app/src/uni_modules/vk-uview-ui/components/u-waterfall/u-waterfall.vue"]]);
wx.createComponent(Component);
