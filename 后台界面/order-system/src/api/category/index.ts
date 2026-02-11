import http from "@/http";
import { CategoryModel, ListCategotyParm } from "./CategoryModel";
//新增
export const addApi = (parm:CategoryModel)=>{
    return http.post("/api/category",parm)
}
//列表
export const getListApi = (parm:ListCategotyParm)=>{
    return http.get("/api/category/list",parm)
}
//编辑
export const editApi = (parm:CategoryModel)=>{
    return http.put("/api/category",parm)
}
//删除
export const deleteApi = (categoryId:string)=>{
    return http.delete(`/api/category/${categoryId}`)
}
//下拉列表
export const getSelectApi = ()=>{
    return http.get("/api/category/getSelectList")
}
