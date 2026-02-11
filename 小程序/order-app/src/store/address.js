// 引入
import {
	defineStore
} from 'pinia';
//通过defineStore定义一个store,
// defineStore 第一个参数是唯一的
export const addressStore = defineStore('addressStore', {
	state: () => {
		return {
			checkedId: '',
			userName:'',
			phone:'',
			area:'',
			address:''
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		
	},
});
