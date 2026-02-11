<template>
	<!-- <u-swiper name='images' border-radius='1' :duration='duration' :interval='interval' :height="height" :list="swiperList">
	</u-swiper> -->
	<swiper class="swipper-container" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
		:duration="duration">
		<swiper-item @click="toDetails(item.sysGoods)" v-for="(item,index) in swiperList" :key='index'>
			<image class="imgs" :src="item.images.split(',')[0]"></image>
		</swiper-item>
	</swiper>
	<u-divider margin-top='20' margin-bottom='20' color="#F3AF28">店长推荐</u-divider>
	<view class="wrap">
		<u-waterfall v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load @click="toDetails(item)" threshold="-450" border-radius="10"
						:image="item.goodsImage.split(',')[0]" :index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.goodsName}}
					</view>
					<view class="price-item">
						<view class="demo-price">
							{{item.specs[0].goodsPrice}}元
						</view>
						<view class="demo-title">
							/份
						</view>
						<image @click="toDetails(item)" class="carimg" :src="carimg"></image>
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<u-lazy-load @click="toDetails(item)" threshold="-450" border-radius="10"
						:image="item.goodsImage.split(',')[0]" :index="index"></u-lazy-load>
					<view class="demo-title">
						{{item.goodsName}}
					</view>
					<view class="price-item">
						<view class="demo-price">
							{{item.specs[0].goodsPrice}}元
						</view>
						<view class="demo-title">
							/份
						</view>
						<image @click="toDetails(item)" class="carimg" :src="carimg"></image>
					</view>
				</view>
			</template>
		</u-waterfall>
	</view>
</template>

<script setup>
	import {
		getSwipperListApi,
		getHotListApi
	} from '../../api/home.js'
	import {
		getRecoListApi,
		reportRecoEventBatchApi
	} from '../../api/reco.js'
	import {
		userLogin
	} from '../../api/user.js'
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	const carimg = ref('/static/goodscar.png')
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
	//列表数据
	const flowList = ref([])
	//获取轮播图数据
	const getSwipperList = async () => {
		let res = await getSwipperListApi()
		if (res && res.code == 200) {
			swiperList.value = res.data;
		}
	}
	//推荐数据（失败时兜底热推）
	const getRecommendList = async () => {
		const openid = uni.getStorageSync('openid')
		let res = await getRecoListApi({
			openid: openid,
			scene: 'home_hot',
			size: 20
		})
		if (res && res.code == 200 && res.data && res.data.items && res.data.items.length > 0) {
			flowList.value = res.data.items;
			reportExpose(flowList.value)
			return
		}
		await getHotList()
	}
	//热推数据（推荐为空时兜底）
	const getHotList = async () => {
		let res = await getHotListApi()
		if (res && res.code == 200) {
			flowList.value = res.data;
		}
	}
	//曝光埋点
	const reportExpose = async(list = []) => {
		const openid = uni.getStorageSync('openid')
		if (!openid || !list || list.length == 0) return
		const events = list.map(item => ({
			openid,
			goodsId: item.goodsId,
			eventType: 'expose',
			scene: 'home_hot'
		}))
		await reportRecoEventBatchApi(events)
	}
	//点击埋点
	const reportClick = async(item) => {
		const openid = uni.getStorageSync('openid')
		if (!openid || !item || !item.goodsId) return
		await reportRecoEventBatchApi([{
			openid,
			goodsId: item.goodsId,
			eventType: 'click',
			scene: 'home_hot'
		}])
	}
	//跳转详情
	const toDetails = async(item) => {
		await reportClick(item)
		console.log(item)
		//在起始页面跳转到details.vue页面并传递参数
		uni.navigateTo({
			url: '../detail/detail?goods=' + encodeURIComponent(JSON.stringify(item))
		});
	}
	onLoad(async() => {
		await userLogin()
		getSwipperList()
		getRecommendList()
	})
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* 设置轮播图容器高度 */
	.swipper-container {
		height: 150px;
	}

	/* 设置swipper-container元素下面的item样式 */
	.swipper-container .item {
		height: 100%;
		text-align: center;
		line-height: 150px;
	}

	.imgs {
		height: 400rpx;
		width: 100%;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.wrap {
		padding: 0px 5px;
	}

	.demo-warter {
		border-radius: 8px;
		/* margin: 5px; */
		background-color: #ffffff;
		padding: 5px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}

	.price-item {
		display: flex;
		align-items: center;
	}

	.carimg {
		height: 50rpx;
		width: 50rpx;
		margin-top: 5px;
		margin-left: 8px;
	}
</style>
