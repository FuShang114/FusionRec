<template>
	<view>
		<!-- <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="userinfo u-flex-1" @click="getUserInfo">
				<view class="img-container">
					<image class="uimage" :src='avatarUrl'></image>
				</view>
				<u-divider>{{nickName}}</u-divider>
			</view>
		</view> -->
		<view>
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="uimage" :src="avatarUrl"></image>
			</button>
			<input id="nickname-input" type="nickname" style="text-align: center;" class="weui-input"
				placeholder="点击选择头像和昵称" v-model="nickName" @blur="onNickName" />
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item @click="toOrder" icon="star" title="我的订单"></u-cell-item>
				<u-cell-item @click="toCollect" icon="photo" title="我的收藏"></u-cell-item>
				<u-cell-item @click="toAddress" icon="coupon" title="我的地址"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {
		computed,
		ref,
		getCurrentInstance
	} from 'vue'
	import {
		userLogin,
		uploadImageApi,
		saveOrUpdateApi
	} from '../../api/user.js'
	import http from '../../common/http.js'
	import {userStore} from '../../store/user.js'
	const ustore = userStore()
	const instance = getCurrentInstance(); // 获取组件实例
	//昵称
	const nickName = computed(()=>{
		if(ustore.nickName){
			return ustore.nickName
		}else{
			return ''
		}
	})
	//头像
	// const avatarUrl = ref('/static/user.jpg')
	const avatarUrl = computed(()=>{
		if(ustore.avatarUrl){
			return http.baseUrl + ustore.avatarUrl
		}else{
			return '/static/user.jpg'
		}
	})
	const onChooseAvatar = (e) => {
			console.log(e)
			avatarUrl.value = e.detail.avatarUrl
			//上传服务器
			uploadImageApi({
				url:"/api/upload/uploadImage",
				filePath:e.detail.avatarUrl
			}).then((res)=>{
				//图片上传成功，存到数据库
				console.log(res)
				let result = JSON.parse(res)
				saveOrUpdateApi({
					openid:uni.getStorageSync('openid'),
					avatarUrl:result.data
				}).then(res=>{
					console.log(res)
					ustore.avatarUrl = result.data
				})
			})
		}
		const onNickName = (e) => {
			console.log(e)
			uni.createSelectorQuery().in(instance) // 注意这里要加上 in(this)  
			    .select("#nickname-input")  
			    .fields({  
			        properties: ["value"],  
			    })  
			    .exec((res) => {  
					console.log(res)
			         nickName.value = res?.[0]?.value  
			        console.log('昵称', nickName.value)  
					saveOrUpdateApi({
						openid:uni.getStorageSync('openid'),
						nickName:res?.[0]?.value
					}).then(res=>{
						console.log(res)
						ustore.nickName = res?.[0]?.value
					})
					
			    })
		}
	//获取头像点击事件
	const getUserInfo = () => {
		console.log('获取头像')
		if (uni.getStorageSync('avatarUrl') && uni.getStorageSync('nickName')) {
			nickName.value = uni.getStorageSync('nickName')
			avatarUrl.value = uni.getStorageSync('avatarUrl')
		} else {
			uni.getUserProfile({
				desc: '用于头像昵称展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: (res) => {
					console.log(res)
					nickName.value = res.userInfo.nickName
					avatarUrl.value = res.userInfo.avatarUrl
					uni.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
					uni.setStorageSync('nickName', res.userInfo.nickName);
				}
			})
		}
	}
	//跳转详情
	const toOrder = () => {
		// getUserInfo()
		//在起始页面跳转到details.vue页面并传递参数
		uni.navigateTo({
			url: '../order/order'
		});
	}
	const toAddress = () => {
		// getUserInfo()
		//在起始页面跳转到details.vue页面并传递参数
		uni.navigateTo({
			url: '../addresslist/addresslist'
		});
	}
	const toCollect = () => {
		// getUserInfo()
		//在起始页面跳转到details.vue页面并传递参数
		uni.navigateTo({
			url: '../collect/collect'
		});
	}
	onShow(() => {
		userLogin()
		// getUserInfo()
	})
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.userinfo {
		margin: 30rpx 0rpx;
	}

	.img-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uimage {
		height: 50px;
		width: 50px;
		border-radius: 50%;
		margin: 5px 0px;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>
