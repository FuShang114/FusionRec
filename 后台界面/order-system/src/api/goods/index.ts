import http from "@/http";
import { GoodsListParm, GoodsType } from "./GoodsModel";
//新增
export const addApi = (parm:GoodsType)=>{
    return http.post("/api/goods",parm)
}
//列表
export const getListApi = (parm:GoodsListParm)=>{
    return http.get("/api/goods/list",parm)
}
//编辑
export const editApi = (parm:GoodsType)=>{
    return http.put("/api/goods",parm)
}
//删除
export const deleteApi = (goodsId:string)=>{
    return http.delete(`/api/goods/${goodsId}`)
}
//菜品下拉列表
export const getSelectListApi = ()=>{
    return http.get("/api/goods/getSelectList")
}