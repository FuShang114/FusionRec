<template>
	<view class="u-wrap">
		<!-- <view class="u-search-box">
			<view class="u-search-inner">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<text class="u-search-text">搜索uView</text>
			</view>
		</view> -->
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
					:class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
					@tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.categoryName}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item">
							<!-- <view class="item-title">
								<text>{{item.name}}</text>
							</view> -->
							<view class="item-container">
								<view class="thumb-box" v-for="(item1, index1) in item.goods" :key="index1">
									<image @click="toDetails(item1)" class="item-menu-image" :src="item1.goodsImage.split(',')[0]" mode=""></image>
									<view class="item-menu-name">{{item1.goodsName}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script setup>
	import {getCategoryListApi} from '../../api/category.js'
	import {
		ref,
		getCurrentInstance
	} from 'vue';
import { onLoad } from '@dcloudio/uni-app';
	// 获取组件实例
	const instance = getCurrentInstance();
	const tabbar = ref([])
	const scrollTop = ref(0)
	const current = ref(0)
	const menuHeight = ref(0)
	const menuItemHeight = ref(0)
	const getImg = ()=>{
		return Math.floor(Math.random() * 35);
	}
	const swichMenu = async(index)=>{
		if(index == current.value) return ;
		current.value = index;
		// 如果为0，意味着尚未初始化
		if(menuHeight.value == 0 || menuItemHeight.value == 0) {
			await getElRect('menu-scroll-view', 'menuHeight');
			await getElRect('u-tab-item', 'menuItemHeight');
		}
		// 将菜单菜单活动item垂直居中
		scrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2;
	}
	const getElRect = (elClass, dataVal)=>{
		new Promise((resolve, reject) => {
			const query = uni.createSelectorQuery().in(instance);
			query.select('.' + elClass).fields({size: true},res => {
				// 如果节点尚未生成，res值为null，循环调用执行
				if(!res) {
					setTimeout(() => {
						getElRect(elClass);
					}, 10);
					return ;
				}
				instance[dataVal] = res.height;
			}).exec();
		})
	}
	//获取分类数据
	const getCategoryList = async()=>{
		let res = await getCategoryListApi()
		if(res && res.code == 200){
			tabbar.value = res.data;
		}
	}
	//跳转详情
	const toDetails = (item)=>{
	    //在起始页面跳转到details.vue页面并传递参数
	    uni.navigateTo({
	        url: '../detail/detail?goods='+ encodeURIComponent(JSON.stringify(item))
	    });
	}
	onLoad(()=>{
		getCategoryList()
	})
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid #F3AF28;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
