import http from '../common/http.js'
import { userStore } from '../store/user.js'
//获取code
export const getCode = () => {
	const promise = new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin', //使用微信登录
			success: function(loginRes) {
				console.log('8888888888')
				console.log(loginRes.code);
				//如果返回数据
				if (loginRes && loginRes.code) {
					//数据返回
					resolve(loginRes.code)
				} else {
					reject(loginRes)
				}
			}
		})
	}).catch(res => {
		uni.showToast({
			icon: 'none',
			title: res.errMsg || '获取code失败!'
		})
	})
	return promise;
}
export const getUserInfoApi = (parm)=>{
	return http.get("/wxapi/wxUser/getUserInfo",parm)
}
//小程序登录
export const wxLoginApi = (code) => {
	return http.post('/wxapi/user/wxLogin', {
		code: code
	})
}
//封装登录
export const userLogin = async () => {
	const store = userStore()
	//获取code
	let res = await getCode()
	//登录: 调用我们自己的后端接口
	const {
		data
	} = await wxLoginApi(res)
	console.log('登录')
	console.log(data)
	if (data) {
		//存储
		uni.setStorageSync('openid', data.openid)
		uni.setStorageSync('sessionkey', data.sessionKey)
	}
	let result = await getUserInfoApi({
		openid:data.openid
	})
	console.log(result.data)
	if(result.data && result.data.avatarUrl){
		store.avatarUrl = result.data.avatarUrl
		uni.setStorageSync('avatarUrl', result.data.avatarUrl)
	}
	if(result.data && result.data.nickName){
		store.nickName = result.data.nickName
		uni.setStorageSync('nickName', result.data.nickName)
	}
}
//新增地址
export const addAddressApi = (parm)=>{
	return http.post("/wxapi/address",parm)
}
//地址列表
export const addressListApi = (parm)=>{
	return http.get("/wxapi/address/list",parm)
}
//编辑地址
export const editAddressApi = (parm)=>{
	return http.put("/wxapi/address",parm)
}
//默认地址查询
export const getAddressApi = (parm)=>{
	return http.get("/wxapi/address/getAddress",parm)
}
//头像上传
export const uploadImageApi = (parm)=>{
    return http.upload(parm)
}
//头像昵称更新
export const saveOrUpdateApi = (parm)=>{
	return http.post("/wxapi/wxUser/saveOrUpdate",parm)
}
//新增评论
export const addCommentApi = (parm)=>{
	return http.post("/wxapi/comment/addComment",parm)
}
export const listCollectApi = (parm)=>{
	return http.get("/wxapi/collect/list",parm)
}
export const deleteCollectApi = (parm)=>{
	return http.post("/wxapi/collect/deleteCollect",parm)
}