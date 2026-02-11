//定义列表查询的参数类型
export type ListCategotyParm = {
    currentPage:number;
    pageSize:number;
    categoryName:string;
    total:number;
}
//新增分类数据类型
export type CategoryModel = {
    type:string; //区分新增、编辑
    categoryId:string;
    categoryName:string;
    orderNum:string;
}