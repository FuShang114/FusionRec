import { BannerListParm } from "@/api/banner/BannerModel";
import { reactive ,ref,onMounted,nextTick} from "vue";
import {getListApi} from '@/api/banner/index'
export default function useBannerTable(){
    //表格高度
    const tableHeight = ref(0)
    //接收表格数据
    const tableList = ref([])
    //列表查询的参数
    const listParm = reactive<BannerListParm>({
        currentPage:1,
        pageSize:10,
        title:'',
        total:0
    })
    //列表
    const getList = async()=>{
        let res = await getListApi(listParm)
        if(res && res.code == 200){
            tableList.value = res.data.records;
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
        listParm.title = ''
        getList()
    }
    //页容量改变时触发
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
        listParm,
        getList,
        searchBtn,
        resetBtn,
        tableList,
        sizeChange,
        currentChange,
        tableHeight
    }
}