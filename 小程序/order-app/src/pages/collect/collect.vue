<template>
	<view class="item" v-for="(res, index) in siteList.list" :key="res.id">
		<image class="uimage" :src="res.goodsImage.split(',')[0]"></image>
		<view style="flex-grow: 1;display: flex;justify-content: space-between;">
			<view class="top">
				<view class="name">{{ res.goodsName }}</view>
			</view>
			<view class="bottom">
				<u-icon @click="update(res)" name="close" :size="35" color="#999999"></u-icon>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		reactive,
		ref
	} from 'vue'
	import {
		addressStore
	} from '../../store/address.js'
	import {
		listCollectApi,
		deleteCollectApi
	} from '../../api/user.js'
	const store = addressStore()
	const avatarUrl = ref('/static/user.jpg')
	//地址数据
	const siteList = reactive({
		list: []
	})
	//查询地址数据
	const getList = async () => {
		let res = await listCollectApi({
			openid: uni.getStorageSync('openid')
		})
		console.log(res)
		if (res && res.code == 200) {
			siteList.list = res.data
		}
	}
	//跳转新增地址
	const toAddSite = () => {
		uni.navigateTo({
			url: '../address/address'
		});
	}
	//删除
	const update = async(item) => {
		console.log(item)
		let res = await deleteCollectApi({
			collectId:item.collectId
		})
		if(res && res.code == 200){
			uni.showToast({
				icon:'none',
				title:res.msg
			})
			getList()
		}
	}
	//单选点击事件
	const radioChange = (e)=>{
		console.log(e)
		if(e.detail.value){
			let item = JSON.parse(e.detail.value)
			store.checkedId = item.addressId
			store.userName = item.userName
			store.phone = item.phone
			store.area = item.area
			store.address = item.address
			//关闭页面
			uni.navigateBack()
		}
	}
	onShow(() => {
		getList()
	})
</script>

<style lang="scss" scoped>
	.uimage {
		height: 50px;
		width: 50px;
		border-radius: 50%;
		margin: 5px 10px 5px 0px;
	}
	.item {
		padding: 40rpx 20rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #efefef;
		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;

			.phone {
				margin-left: 60rpx;
			}

			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;

				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: rgb(49, 145, 253);
				}

				.red {
					background-color: red
				}
			}
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}

	.addSite {
		display: flex;
		justify-content: space-around;
		width: 600rpx;
		line-height: 100rpx;
		position: absolute;
		bottom: 30rpx;
		left: 80rpx;
		background-color: #F3AF28;
		border-radius: 60rpx;
		font-size: 30rpx;

		.add {
			display: flex;
			align-items: center;
			color: #ffffff;

			.icon {
				margin-right: 10rpx;
			}
		}
	}
</style>
