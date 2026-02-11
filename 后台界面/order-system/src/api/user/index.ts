import http from "@/http";
import { ListUserParm, UserModel,LoginType } from "./UserModel";
//新增
export const addUserApi = (parm:UserModel)=>{
    return http.post("/api/user",parm)
}
//列表
export const getListApi = (parm:ListUserParm)=>{
    return http.get("/api/user/list",parm)
}
//编辑
export const editUserApi = (parm:UserModel)=>{
    return http.put("/api/user",parm)
}
//删除
export const deleteUserApi = (userId:string)=>{
    return http.delete(`/api/user/${userId}`)
}
//验证码
export const getImgApi = ()=>{
    return http.post("/api/user/image")
}
//登录
export const loginApi = (parm:LoginType) => {
    return http.post("/api/user/login",parm)
}