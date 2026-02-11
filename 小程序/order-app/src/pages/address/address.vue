<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" v-model="address.userName" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" v-model="address.phone" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @confirm='confirm' @tap="showRegionPicker">
				<view class="left">所在地区:</view>
				<input disabled style="width: 100%;" v-model="address.area" type="text" :placeholder-class="line"
					placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" v-model="address.address" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
		</view>
		<view class="bottom">
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right">
					<switch :checked="address.status == '1'" color="red" @change="setDefault" />
				</view>
			</view>
		</view>
		<u-picker v-model="show" mode="region" ref="uPicker" @confirm="confirm"></u-picker>
		<u-button @click="addBtn" :custom-style="customStyle" type="warning">提交</u-button>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import { addAddressApi,editAddressApi } from '../../api/user.js'
	const show = ref(false)
	const finalAddress = ref('')
	const customStyle = reactive({
		margin: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
	})
	const setDefault = (dom) => {
		console.log(dom)
		//设置默认地址
		dom.detail.value ? address.status = '1' : address.status = '0'
	}
	const showRegionPicker = () => {
		show.value = true
	}
	const confirm = (e) => {
		console.log(e)
		address.area = e.province.name + '/' + e.city.name + '/' + e.area.name
		console.log(address.area)
	}
	//表单绑定的数据
	const address = reactive({
		addressId:'',
		openid:uni.getStorageSync('openid'),
		userName:"",
		phone:'',
		area:'',
		address:'',
		status:'0'
	})
	//提交
	const addBtn = async()=>{
		console.log(address)
		//表单验证
		if(!address.userName){
			uni.showToast({
				icon:'none',
				title:'请填写姓名'
			})
			return;
		}
		if(!address.phone){
			uni.showToast({
				icon:'none',
				title:'请填写电话'
			})
			return;
		}
		if(!address.area){
			uni.showToast({
				icon:'none',
				title:'请选择区域'
			})
			return;
		}
		if(!address.address){
			uni.showToast({
				icon:'none',
				title:'请填写详细地址'
			})
			return;
		}
		let res = null;
		if(type.value == '0'){
			res = await addAddressApi(address)
		}else{
			res = await editAddressApi(address)
		}
		console.log(res)
		if(res && res.code == 200){
			//返回列表
			uni.navigateBack()
		}
	}
	//区分是新增 0 还是编辑 1
	const type = ref('0')
	onLoad((options)=>{
		console.log(options)
		//编辑设置值
		if(options.item){
			//设为编辑
			type.value = '1';
			const item = JSON.parse(options.item)
			address.addressId = item.addressId
			address.phone = item.phone
			address.userName = item.userName
			address.area = item.area
			address.address = item.address
			address.status = item.status
		}
	})
</script>

<style lang="scss" scoped>
	:deep(.line) {
		color: $u-light-color;
		font-size: 28rpx;
	}

	.wrap {
		background-color: #f2f2f2;

		.top {
			background-color: #ffffff;
			border-top: solid 2rpx $u-border-color;
			padding: 22rpx;

			.item {
				display: flex;
				font-size: 32rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: solid 2rpx $u-border-color;

				.left {
					width: 180rpx;
				}

				input {
					text-align: left;
				}
			}

			.address {
				padding: 20rpx 0;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
			}

			.site-clipboard {
				padding-right: 40rpx;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}

				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: $u-tips-color;
					height: 80rpx;

					.icon {
						margin-top: 6rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.bottom {
			margin-top: 20rpx;
			padding: 40rpx;
			padding-right: 0;
			background-color: #ffffff;
			font-size: 28rpx;

			.tag {
				display: flex;

				.left {
					width: 160rpx;
				}

				.right {
					display: flex;
					flex-wrap: wrap;

					.tags {
						width: 140rpx;
						padding: 16rpx 8rpx;
						border: solid 2rpx $u-border-color;
						text-align: center;
						border-radius: 50rpx;
						margin: 0 10rpx 20rpx;
						display: flex;
						font-size: 28rpx;
						align-items: center;
						justify-content: center;
						color: $u-content-color;
						line-height: 1;
					}

					.plus {
						//padding: 10rpx 0;
					}
				}
			}

			.default {
				// margin-top: 50rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: solid 2rpx $u-border-color;
				line-height: 64rpx;

				.tips {
					font-size: 24rpx;
				}

				.right {}
			}
		}
	}
</style>
