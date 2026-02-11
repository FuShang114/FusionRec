import http from "@/http";
import { OrderListParm } from "./OrderModel";
//列表
export const gePcOrdertListApi = (parm:OrderListParm)=>{
    return http.get("/wxapi/order/getPcOrderList",parm)
}
//列表
export const sendOrderApi = (orderId:string)=>{
    return http.put("/wxapi/order/sendOrder",{orderId:orderId})
}
//统计
export const getTotalApi = (type:string)=>{
    return http.get("/wxapi/order/getTotal",{type:type})
}