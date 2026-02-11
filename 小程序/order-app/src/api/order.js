import http from '../common/http.js'
export const splaceOrderApi = (parm)=>{
	return http.post("/wxapi/order/splaceOrder",parm)
}
export const getOrderListApi = (parm)=>{
	return http.get("/wxapi/order/getOrderList",parm)
}
export const cancelOrderApi = (parm)=>{
	return http.post("/wxapi/order/cancelOrder",parm)
}
export const commentListApi = (parm)=>{
	return http.get("/wxapi/comment/commentList",parm)
}
export const addCollectApi = (parm)=>{
	return http.post("/wxapi/collect/addCollect",parm)
}
export const hasCollectApi = (parm)=>{
	return http.get("/wxapi/collect/hasCollect",parm)
}
export const cancelCollectApi = (parm)=>{
	return http.post("/wxapi/collect/cancelCollect",parm)
}
export const confirmOrderApi = (parm)=>{
	return http.post("/wxapi/order/confirmOrder",parm)
}