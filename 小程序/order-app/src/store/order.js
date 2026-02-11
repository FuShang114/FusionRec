// 引入
import {
	defineStore
} from 'pinia';
//通过defineStore定义一个store,
// defineStore 第一个参数是唯一的
export const orderStore = defineStore('orderStore', {
	state: () => {
		return {
			count: 0,
			//存储购物车数据
			orderList: []
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		//单条数据加入
		addOrder(goods){
			//判断是否已经加入到购物车
			const index = this.orderList.findIndex(item => goods.goodsId == item.goodsId)
			//存在，删除购物车数据里面的数据
			if(index > -1){
				//删除原来的数据
				this.orderList.splice(index,1);
			}
			//加的购物车
			this.orderList.push(goods)
		},
		//多条数据加入
		addOrderList(list){
			list.forEach(goods=>{
				//判断是否已经加入到购物车
				const index = this.orderList.findIndex(item => goods.goodsId == item.goodsId)
				//存在，删除购物车数据里面的数据
				if(index > -1){
					//删除原来的数据
					this.orderList.splice(index,1);
				}
				//加的购物车
				this.orderList.push(goods)
			})
		}
	},
});
