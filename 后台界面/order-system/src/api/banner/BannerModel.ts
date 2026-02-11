//列表参数类型
export type BannerListParm = {
    currentPage:number;
    pageSize:number;
    title:string;
    total:number; //分页的总条数
} 
//广告管理数据类型
export type BannerType = {
    type:string;
    banId:string;
    goodsId:string;
    title:string;
    images:string;
    status:string;
    orderNum:string;
}