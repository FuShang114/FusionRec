import { OrderListParm } from '@/api/order/OrderModel'
import {nextTick, onMounted, reactive, ref} from 'vue'
import { gePcOrdertListApi,sendOrderApi } from '@/api/order'
import useInstance from '@/hooks/useInstance'
export default function useOrderTable(){
    const { global } = useInstance()
    //表格高度
    const tableHeight = ref(0)
    //表格数据
    const tableList = ref([])
    //表格查询的参数
    const listParm = reactive<OrderListParm>({
        currentPage:1,
        pageSize:10,
        userName:'',
        type:"",
        total:0
    })
    //列表
    const getList = async()=>{
        let res = await gePcOrdertListApi(listParm)
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
        listParm.userName = ''
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
    const sendOrder = async(orderId:string)=>{
        let confirm = await  global.$myconfirm('确定发货吗?')
        if(confirm){
            let res = await sendOrderApi(orderId)
            if(res && res.code == 200){
                getList()
            }
        }
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
        tableHeight,
        sendOrder
    }
}