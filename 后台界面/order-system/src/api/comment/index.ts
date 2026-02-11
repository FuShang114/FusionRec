import http from "@/http";
import { CommentListParm } from "./CommentModel";

//列表
export const getListApi = (parm:CommentListParm)=>{
    return http.get("/wxapi/comment/pcCommentList",parm)
}
//删除
export const deleteApi = (commentId:string)=>{
    return http.delete(`/wxapi/comment/${commentId}`)
}