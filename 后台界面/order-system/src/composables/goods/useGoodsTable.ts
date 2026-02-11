import { GoodsListParm } from '@/api/goods/GoodsModel'
import {nextTick, onMounted, reactive, ref} from 'vue'
import { getListApi } from '@/api/goods'
export default function useGoodsTable(){
    //表格高度
    const tableHeight = ref(0)
    //表格数据
    const tableList = ref([])
    //表格查询的参数
    const listParm = reactive<GoodsListParm>({
        currentPage:1,
        pageSize:10,
        goodsName:'',
        total:0
    })
    //列表
    const getList = async()=>{
        let res = await getListApi(listParm)
        if(res && res.code == 200){
            //设置表格数据
            tableList.value = res.data.records;
            //设置分页总条数
            listParm.total = res.data.total;
        }
    }
    //搜索
    const searchBtn = ()=>{
        getList()
    }
    //重置
    const resetBtn = ()=>{
        listParm.currentPage = 1;
        listParm.goodsName = ''
        getList()
    }
    //页容量改变触发
    const sizeChange = (size:number)=>{
        listParm.pageSize = size;
        getList()
    }
    //页数改变触发
    const currentChange = (page:number)=>{
        listParm.currentPage = page;
        getList()
    }
    onMounted(()=>{
        getList()
        nextTick(()=>{
            tableHeight.value = window.innerHeight - 220
        })
    })
    return{
        tableList,
        listParm,
        getList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange,
        tableHeight
    }
}