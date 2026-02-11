//列表参数类型
export type OrderListParm = {
    currentPage:number;
    pageSize:number;
    type:string;
    userName:string;
    total:number; //分页的总条数
}