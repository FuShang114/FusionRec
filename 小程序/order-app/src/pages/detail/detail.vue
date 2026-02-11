<template>
	<u-swiper name='images' border-radius='1' :duration='duration' :interval='interval' :height="height"
		:list="swipperList">
	</u-swiper>
	<view class="info">
		<view class="title">
			{{title}}
		</view>
		<view class="price">
			{{price}}<span class='goodsUnit'>{{goodsUnit}}</span>
		</view>
	</view>
	<view class="spec-driver">
		规格
	</view>
	<view class="spces">
		<view @click="change(index,item)" :class="{ active: current === index }" v-for="(item,index) in specs"
			class="item">
			{{item.specsName}}
		</view>
	</view>
	<view class="detalis">
		<view @click="tabClick(0)" class="left" :class="[tabIndex == 0 ? 'item-active':'item']">
			详情
		</view>
		<view @click="tabClick(1)" class="right" :class="[tabIndex == 1 ? 'item-active':'item']">
			评论
		</view>
	</view>
	<swiper style="height: 100%;" class="swiper-box" :current="swiperCurrent" @animationfinish="animationfinish">
		<swiper-item class="swiper-item">
			<scroll-view scroll-y style="height: 100%;width: 100%;">
				<view id="content-wrap0" class="page-box">
					<u-parse :html="content"></u-parse>
				</view>
			</scroll-view>
		</swiper-item>
		<swiper-item class="swiper-item">
			<scroll-view scroll-y style="height: 100%;width: 100%;">
				<view id="content-wrap1" class="page-box">
					<view class="comment" v-for="(res, index) in commentList" :key="res.id">
						<view class="left"><image :src="http.baseUrl+res.avatarUrl" mode="aspectFill"></image></view>
						<view class="right">
							<view class="top">
								<view class="name">{{ res.nickName }}</view>
							</view>
							<view class="content">{{ res.commentText }}</view>
							<view class="bottom">
								{{ res.createTime }}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</swiper-item>
	</swiper>
	<view class="navigation">
		<view class="left">
			<view class="item" @click="toHome">
				<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">首页</view>
			</view>
			<view class="item" @click="toCollect">
				<u-icon v-if="hasCollect == '1'" color="#F3AF28" :size="40"  name="star"></u-icon>
				<u-icon v-if="hasCollect == '0'"  :size="40"  name="star"></u-icon>
				<view class="text u-line-1">收藏</view>
			</view>
			<view class="item car" @click="toCar">
				<u-badge class="car-num" :count="carCount" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">购物车</view>
			</view>
		</view>
		<view class="right">
			<view class="cart btn u-line-1" @click="addCar">加入购物车</view>
			<view @click="addBuy" class="buy btn u-line-1">立即购买</view>
		</view>
	</view>
</template>

<script setup>
	import http from '../../common/http.js'
	import {
		computed,
		ref,
		getCurrentInstance,
		nextTick
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import { carStore } from '../../store/car.js' 
	import { commentListApi,addCollectApi,hasCollectApi,cancelCollectApi } from '../../api/order.js'
	import {
		orderStore
	} from '../../store/order.js'
	import {userLogin} from '../../api/user.js'
	const instance = getCurrentInstance()
	//获取store
	const store = carStore()
	const ostore = orderStore()
	//购物车数量
	const carCount = computed(()=>{
		return store.carList.length
	})
	const hasCollect = ref('0')
	//菜品详情
	const content = ref('')
	const current = ref(0)
	//轮播图高度
	const height = ref('400')
	//是否显示面板指示点
	const indicatorDots = ref(true)
	//是否自动播放
	const autoplay = ref(true)
	//自动切换时间间隔
	const interval = ref(2000)
	//滑动动画时长
	const duration = ref(500)
	//定义轮播图的数据
	const swiperList = ref([])
	//轮播图数据
	const swipperList = ref([])
	//标题
	const title = ref('')
	//价格
	const price = ref(0)
	//单位
	const goodsUnit = ref('')
	//购物车的数据类型
	const carData = ref({
		flag: true,
		goodsName: "",
		goodsUnit: '',
		goodsId: '',
		num: 1,
		specsName: '',
		price: '',
		goodsImage: ''
	})
	//规格
	const specs = ref([])
	const commentList = ref()
	//规格点击事件
	const change = (index, item) => {
		current.value = index
		price.value = item.goodsPrice
		carData.value.price = item.goodsPrice
		carData.value.specsName = item.specsName
	}
	//获取评论数据
	const getCommentList = async()=>{
		let res = await commentListApi({
			goodsId:carData.value.goodsId
		})
		console.log(res)
		if(res && res.code == 200){
			commentList.value = res.data
		}
	}
	//详情tab
	const swiperCurrent = ref(0)
	const dx = ref(0)
	const tabIndex = ref(0)
	
	const swiperHeight = ref(0)
	const currentIndex = ref(0)
	const setSwiperHeight = ()=>{
		let element = "#content-wrap" + currentIndex.value;
		      let query = uni.createSelectorQuery().in(instance);
		      query.select(element).boundingClientRect();
		      query.exec((res) => {
				  console.log(res)
		        if (res && res[0]) {
		          swiperHeight.value = res[0].height;
		        }
		});
	}
	// tab栏内容切换
	const tabClick = (index) => {
		tabIndex.value = index;
		swiperCurrent.value = index;
		currentIndex.value = index;
		setSwiperHeight()
	}
	//加入购物车
	const addCar = ()=>{
		store.addCar(carData.value)
	}
	//立即购买
	const addBuy = ()=>{
		//清空
		ostore.orderList = []
		ostore.addOrder(carData.value)
		uni.navigateTo({
			url: '../confirm/confirm'
		});
	}
	const animationfinish = ({
		detail: {
			current
		}
	}) => {
		console.log(current)
		swiperCurrent.value = current;
		tabIndex.value = current;
	}
	//跳转首页
	const toHome = () => {
		uni.switchTab({
			url: '../index/index'
		});
	}
	//跳转购物车
	const toCar = () => {
		uni.switchTab({
			url: '../car/car'
		});
	}
	//收藏
	const toCollect = async()=>{
		if(hasCollect.value == '0'){ //未收藏
			let res = await addCollectApi({
				openid:uni.getStorageSync('openid'),
				goodsId:carData.value.goodsId
			})
			if(res && res.code == 200){
				hasCollectMeth()
				uni.showToast({
					icon:'none',
					title:res.msg
				})
			}
		}else{ //已收藏
			let res = await cancelCollectApi({
				openid:uni.getStorageSync('openid'),
				goodsId:carData.value.goodsId
			})
			if(res && res.code == 200){
				hasCollectMeth()
				uni.showToast({
					icon:'none',
					title:res.msg
				})
			}
		}
		
	}
	const hasCollectMeth = async()=>{
		let res = await hasCollectApi({
			openid:uni.getStorageSync('openid'),
			goodsId:carData.value.goodsId
		})
		console.log(res)
		if(res.data && res.data == '1'){
			hasCollect.value = '1'
		}else{
			hasCollect.value = '0'
		}
	}
	
	onLoad((options) => {
		userLogin()
		const goods = JSON.parse(decodeURIComponent(options.goods))
		swipperList.value = goods.goodsImage.split(',')
		console.log(goods)
		goodsUnit.value = goods.goodsUnit
		title.value = goods.goodsName
		price.value = goods.specs[0].goodsPrice
		specs.value = goods.specs
		content.value = goods.goodsDesc
		//设置购物车数据
		carData.value.goodsId = goods.goodsId
		carData.value.goodsName = goods.goodsName
		carData.value.goodsUnit = goods.goodsUnit
		carData.value.specsName = goods.specs[0].specsName
		carData.value.price = goods.specs[0].goodsPrice
		carData.value.goodsImage = goods.goodsImage.split(',')[0]
		hasCollectMeth()
		getCommentList()
		nextTick(()=>{
			setSwiperHeight()
		})
	})
</script>
<style>
	page {
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	page {
		display: flex;
		flex-direction: column;
	}

	.info {
		display: flex;
		align-items: center;
		background-color: #FFF;
	}

	.title {
		color: #313131;
		font-weight: bold;
		padding: 20rpx;
		font-size: 30rpx;
	}

	.price {
		color: #F3AF28;
		padding: 20rpx;
		font-weight: bold;
	}

	.goodsUnit {
		padding-left: 3rpx;
		color: #000;
	}

	.spec-driver {
		display: flex;
		align-items: center;
		padding: 10rpx 20rpx;
		font-weight: bold;
		background-color: #f0f0f0;
	}

	.spces {
		display: flex;
		flex-wrap: wrap;
		background-color: #FFF;
		padding: 15rpx 10px;
		margin: 10px 0px;

		.item {
			padding: 5px 20px;
			margin: 0px 10px;
			border-radius: 5px;
			border: 1px solid #E2E2E2;
		}

		.active {
			padding: 5px 20px;
			margin: 0px 10px;
			border-radius: 5px;
			border: 1px solid #E2E2E2;
			background-color: #F3AF28;
			color: #FFF;
		}
	}

	.detalis {
		display: flex;
		padding: 0px 5px;

		.item {
			flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 7px;
		}

		.left {
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
			border-top: 1px solid #E2E2E2;
			border-bottom: 1px solid #E2E2E2;
			border-left: 1px solid #E2E2E2;
		}

		.right {
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
			border: 1px solid #E2E2E2;
		}

		.item-active {
			flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 7px;
			background-color: #f0f0f0;
		}
	}

	.navigation {
		display: flex;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		position: fixed;
		width: 100%;
		bottom: 0;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #F3AF28;
			}
		}
	}

	.swiper-box {
		flex: 1;
	}

	.page-box {
		padding: 20rpx;
	}
	.comment {
		display: flex;
		padding: 30rpx;
		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				.name {
					color: #5677fc;
				}
				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;
					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}
				.highlight {
					color: #5677fc;
					.num {
						color: #5677fc;
					}
				}
			}
			.content {
				margin-bottom: 10rpx;
			}
			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;
				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;
					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}
				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;
					.more {
						margin-left: 6rpx;
					}
				}
			}
			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;
				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
