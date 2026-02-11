<template>
	<view class="address" @click="toAddress">
		<view>
			<view class="info">
				<view class="name">
					{{astore.userName}}
				</view>
				<view class="phone">
					{{astore.phone}}
				</view>
			</view>
			<view>
				<span v-if="!astore.address">请填写收货地址</span>
				{{astore.area}}{{astore.address}}
			</view>
		</view>
		<u-icon name="arrow-right" color="#c8c9cc"></u-icon>
	</view>
	<view style="padding-bottom: 60px;margin-top: 10px;" v-if="goods.length > 0">
		<view class="goods-detail" v-for="(item,index) in goods" :key="index">
			<view class="detail-left">
				<view class="goods-left">
					<image style="width: 150rpx; height: 140rpx; margin-left:10px;" :src="item.goodsImage"></image>
				</view>
				<view class="size">
					<text style="font-size: 25rpx;">名称：{{item.goodsName}}</text>
					<text style="font-size: 25rpx;">规格：{{item.specsName}}</text>
					<text class="goods-price">￥{{item.price}}{{item.goodsUnit}}</text>
				</view>
			</view>
			<view class="detail-right">
				<text class="num">x{{item.num}}</text>
			</view>
		</view>
	</view>
	<view class="end">
		<view class="end-left">
			<view>
				总计：<text style="color: #F3AF28;font-weight: bold;">￥{{totalPrice}}</text>
			</view>
		</view>
		<view @click="commitBtn" class="end-right">
			提交订单({{totalNum}})
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed
	} from 'vue'
	import {
		orderStore
	} from '../../store/order.js'
	import {
		carStore
	} from '../../store/car.js'
	import {
		addressStore
	} from '../../store/address.js'
	import {
		getAddressApi
	} from '../../api/user.js'
	import {
		splaceOrderApi
	} from '../../api/order.js'
	import {
		onLoad
	} from '@dcloudio/uni-app';
	//获取store
	const store = orderStore()
	const carstore = carStore()
	const astore = addressStore()
	const goods = computed(() => {
		return store.orderList
	})
	// const goods = reactive([{
	// 		flag: true,
	// 		goodsName: "女款-M",
	// 		goodsUnit: '/份',
	// 		goodsId: 1,
	// 		num: 1,
	// 		specsName: '中',
	// 		price: 149,
	// 		goodsImage: "http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png",
	// 	},
	// 	{
	// 		flag: true,
	// 		goodsName: "女款-M",
	// 		goodsUnit: '/份',
	// 		goodsId: 1,
	// 		specsName: '中',
	// 		num: 1,
	// 		price: 149,
	// 		goodsImage: "http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png",
	// 	},
	// 	{
	// 		flag: true,
	// 		goodsName: "女款-M",
	// 		goodsUnit: '/份',
	// 		goodsId: 1,
	// 		num: 1,
	// 		specsName: '中',
	// 		price: 149,
	// 		goodsImage: "http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png",
	// 	},
	// 	{
	// 		flag: true,
	// 		goodsName: "女款-M",
	// 		goodsId: 1,
	// 		num: 1,
	// 		goodsUnit: '/份',
	// 		specsName: '中',
	// 		price: 149,
	// 		goodsImage: "http://192.168.31.70:8089/images/a35e4257-9e9a-43f8-b077-a7664064ce12.png",
	// 	}
	// ])

	//总数
	const totalNum = computed(() => {
		let totalNum = 0;
		store.orderList.map(item => {
			item.flag ? totalNum += item.num : totalNum += 0;
		})
		return totalNum
	})
	//总共价格
	const totalPrice = computed(() => {
		let totalPrice = 0;
		store.orderList.map(item => {
			item.flag ? totalPrice += item.num * item.price : totalPrice += 0;
		})
		return totalPrice
	})
	//跳转新增地址
	const toAddress = (item) => {
		uni.navigateTo({
			url: '../addresslist/addresslist'
		});
	}
	//查询默认地址
	const getAddress = async () => {
		let res = await getAddressApi({
			openid: uni.getStorageSync('openid')
		})
		console.log(res)
		if (res && res.code == 200 && res.data) {
			astore.checkedId = res.data.addressId
			astore.userName = res.data.userName
			astore.phone = res.data.phone
			astore.area = res.data.area
			astore.address = res.data.address
		}
	}
	//提交订单
	const commitBtn = async () => {
		if (!astore.address) {
			uni.showToast({
				title: '请填写收货地址',
				duration: 2000
			});
			return;
		}
		let commitParm = reactive({
			openid: uni.getStorageSync('openid'),
			userName: astore.userName,
			phone: astore.phone,
			address: astore.area + "," + astore.address,
			price: totalPrice.value,
			details: store.orderList
		})
		const res = await splaceOrderApi(commitParm)
		console.log(res)
		if (res && res.code == 200) {
			//清空购物车
			store.orderList = []
			carstore.carList = []
			uni.navigateBack()
			uni.navigateTo({
				url: '../order/order'
			});
		}
	}
	onLoad(() => {
		getAddress()
	})
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.address {
		display: flex;
		justify-content: space-between;
		background-color: #FFF;
		padding: 10px 20px;

		.info {
			display: flex;

			.name {
				font-size: 15px;
				font-weight: 600;
			}

			.phone {
				margin-left: 10px;
			}
		}
	}

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