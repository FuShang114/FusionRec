// 引入
import {
	defineStore
} from 'pinia';
//通过defineStore定义一个store,
// defineStore 第一个参数是唯一的
export const carStore = defineStore('carStore', {
	state: () => {
		return {
			count: 0,
			//存储购物车数据
			carList: []
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		//数量加 1
		increment() {
			this.count++;
		},
		//加入购物车
		addCar(goods){
			//判断是否已经加入到购物车
			const index = this.carList.findIndex(item => goods.goodsId == item.goodsId)
			//存在，删除购物车数据里面的数据
			if(index > -1){
				//删除原来的数据
				this.carList.splice(index,1);
			}
			//加的购物车
			this.carList.push(goods)
		}
	},
});
