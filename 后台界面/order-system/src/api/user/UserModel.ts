//定义列表查询的数据类型
//type:通常用于定义数据的类型
export type ListUserParm = {
    currentPage:number;
    pageSize:number;
    name:string;
    phone:string;
    total:number; //分页的总条数
}
//表单的数据类型
export type UserModel = {
    type:string; //区分是新增还是编辑
    userId:string;
    username:string;
    password:string;
    phone:string;
    email:string;
    sex:string;
    name:string;
}
//登录参数类型
export type LoginType = {
    username: string,
    password: string,
    code:string
}