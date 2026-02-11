import http from '../common/http.js'
//轮播图
export const getSwipperListApi = ()=>{
	return http.get("/api/home/getSwipperList")
}
//首页热推
export const getHotListApi = ()=>{
	return http.get("/api/home/getHotList")
}