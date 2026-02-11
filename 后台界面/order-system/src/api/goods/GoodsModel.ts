//列表参数类型
export type GoodsListParm = {
    currentPage:number;
    pageSize:number;
    goodsName:string;
    total:number; //分页的总条数
}
//规格类型
export type SpecsType = {
    specsId?:string;
    goodsId?:string;
    specsName:string;
    goodsPrice:string | number;
    orderNum:string;
}
//菜品数据类型
export type GoodsType = {
    type:string;
    goodsId:string;
    categoryId:string;
    goodsName:string;
    goodsImage:string;
    goodsDesc:string;
    status:string;
    goodsUnit:string;
    orderNum:string;
    specs:Array<SpecsType>;
}