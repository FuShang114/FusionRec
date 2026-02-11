import http from "@/http";
import { BannerType,BannerListParm } from "./BannerModel";
//新增
export const addApi = (parm:BannerType)=>{
    return http.post("/api/banner",parm)
}
//列表
export const getListApi = (parm:BannerListParm)=>{
    return http.get("/api/banner/list",parm)
}
//编辑
export const editApi = (parm:BannerType)=>{
    return http.put("/api/banner",parm)
}
//删除
export const deleteApi = (banId:string)=>{
    return http.delete(`/api/banner/${banId}`)
}