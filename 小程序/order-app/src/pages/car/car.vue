<template>
	<view style="padding-bottom: 60px;" v-if="goods.length > 0">
		<view class="goods-detail" v-for="(item,index) in goods" :key="index">
			<view class="detail-left">
				<view class="goods-left">
					<checkbox-group @change="selected($event,item)">
						<label>
							<checkbox :checked="item.flag" />
						</label>
					</checkbox-group>
					<image style="width: 150rpx; height: 140rpx; margin-left:10px;" :src="item.goodsImage"></image>
				</view>
				<view class="size">
					<text style="font-size: 25rpx;">名称：{{item.goodsName}}</text>
					<text style="font-size: 25rpx;">规格：{{item.specsName}}</text>
					<text class="goods-price">￥{{item.price}}{{item.goodsUnit}}</text>
				</view>
			</view>
			<view class="detail-right">
				<text @click="reduce(item)" class="subtract">-</text>
				<text class="num">{{item.num}}</text>
				<text @click="add(item)" class="add">+</text>
			</view>
		</view>
	</view>
	<view class="end">
		<view class="end-left">
			<checkbox-group @change="selectAlls">
				<label>
					<checkbox :checked="allchecked" />全选
				</label>
			</checkbox-group>
			<view>
				总计：<text style="color: #f00;font-weight: bold;">￥{{totalPrice}}</text>
			</view>
		</view>
		<view class="end-right" @click="confirm">
			结算({{totalNum}})
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed
	} from 'vue'
	import {carStore} from '../../store/car.js'
	import {orderStore} from '../../store/order.js'
	//获取store
	const store = carStore()
	const ostore = orderStore()
	const show = ref(true);
	const allchecked = ref(true);
	const checked = ref(true);
	//获取购物车数据
	const goods = computed(()=>{
		if(store.carList.length == 0){
			allchecked.value = false;
		}else{
			allchecked.value = true;
		}
		return store.carList
	})
	// const goods = reactive([{
	// 		flag: true,
	// 		goodsName: "女款-M",
	// 		goodsUnit: '/份',
	// 		goodsId: 1,
	// 		num: 1,
	// 		specsName: '中',
	// 		price: 149,
	// 		goodsImage: "http://192.168.1.3:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png",
	// 	},
	// 	{
	// 		flag: true,
	// 		goodsName: "女款-M",
	// 		goodsUnit: '/份',
	// 		goodsId: 2,
	// 		specsName: '中',
	// 		num: 1,
	// 		price: 149,
	// 		goodsImage: "http://192.168.1.3:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png",
	// 	},
	// 	{
	// 		flag: true,
	// 		goodsName: "女款-M",
	// 		goodsUnit: '/份',
	// 		goodsId: 3,
	// 		num: 1,
	// 		specsName: '中',
	// 		price: 149,
	// 		goodsImage: "http://192.168.1.3:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png",
	// 	},
	// 	{
	// 		flag: true,
	// 		goodsName: "女款-M",
	// 		goodsId: 4,
	// 		num: 1,
	// 		goodsUnit: '/份',
	// 		specsName: '中',
	// 		price: 149,
	// 		goodsImage: "http://192.168.1.3:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png",
	// 	}
	// ])
	//复选框点击事件
	const selected = (e,item)=>{
		console.log(e)
		console.log(item)
		if(item.flag == true){
			item.flag = false;
		}else{
			item.flag = true;
		}
		//全选的设置
		//找出选中的数据
		let newArr = store.carList.filter(item =>(item.flag == true))
		if(newArr.length == store.carList.length){
			allchecked.value = true
		}else{
			allchecked.value = false;
		}
	}
	//全选点击事件
	const selectAlls = ()=>{
		if(allchecked.value == true){
			allchecked.value = false;
			store.carList.forEach(item =>{
				item.flag = false;
			})
		}else{
			allchecked.value = true;
			store.carList.forEach(item =>{
				item.flag = true;
			})
		}
	}
	//购物车减
	const reduce = (item)=>{
		//数量
		let num = item.num;
		if(num > 1){
			num -= 1
		}else if(num =1){
			store.carList.map((dom,i)=>{
				if(dom.goodsId == item.goodsId){
					store.carList.splice(i,1)
				}
			})
		}
		item.num = num;
		if(store.carList.length == 0){
			allchecked.value = false;
		}
	}
	//购物车加
	const add = (item)=>{
		let num = item.num;
		item.num = num +1;
	}
	//总数
	const totalNum = computed(()=>{
		let totalNum = 0;
		store.carList.map(item =>{
			item.flag ? totalNum += item.num : totalNum += 0;
		})
		return totalNum
	})
	//总共价格
	const totalPrice = computed(()=>{
		let totalPrice = 0;
		store.carList.map(item =>{
			item.flag ? totalPrice += item.num*item.price : totalPrice += 0;
		})
		return totalPrice
	})
	//跳转确认订单
	const confirm = (item) => {
		//清空
		ostore.orderList = []
		//如果没有数据，信息提示
		if(store.carList.length == 0){
			uni.showToast({
				icon:'none',
				title:'请选择菜品'
			})
			return;
		}
		//获取购物车中选中的商品
		let checkedList = store.carList.filter(item =>(item.flag == true))
		if(checkedList.length == 0){
			uni.showToast({
				icon:'none',
				title:'请选择要结算的菜品'
			})
			return;
		}
		//设置确定订单数据
		ostore.addOrderList(checkedList)
		uni.navigateTo({
			url: '../confirm/confirm'
		});
	}
</script>

<style lang="scss">
	.goods-detail {
		display: flex;
		padding: 30rpx 15rpx 30rpx 30rpx;
		background-color: #FFF;
		justify-content: space-between;
		border-bottom: 5rpx solid #f1f1f1;
		align-items: center;

		.detail-left {
			display: flex;

			.goods-left {
				display: flex;
				align-items: center;
			}

			.size {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: 30rpx;

				.goods-price {
					font-size: 25rpx;
					color: #F44545;
				}
			}
		}

		.detail-right {
			text {
				width: 50rpx;
				line-height: 50rpx;
				text-align: center;
				display: inline-block;
				background-color: #F7F7F7;
				margin-right: 10rpx;
			}

			.add {
				color: #FA4305;
				border-radius: 10rpx 30rpx 30rpx 10rpx;
				margin-right: 20rpx;
			}

			.subtract {
				border-radius: 30rpx 10rpx 10rpx 30rpx;
			}
		}
	}

	.end {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;

		.end-left {
			width: 70%;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
		}

		.end-right {
			width: 30%;
			line-height: 90rpx;
			background-color: #F3AF28;
			text-align: center;
			color: #fff;
		}
	}
</style>
