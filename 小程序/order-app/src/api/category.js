import http from '../common/http.js'
//分类数据
export const getCategoryListApi = ()=>{
	return http.get("/wxapi/category/getCategoryList")
}