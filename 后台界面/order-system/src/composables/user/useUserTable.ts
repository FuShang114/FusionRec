//表格相关的业务抽离
import { ListUserParm } from '@/api/user/UserModel'
import {reactive,ref,onMounted,nextTick} from 'vue'
import { getListApi } from '@/api/user'
export default function useUserTable(){
    //表格高度
    const tableHeight = ref(0)
    //列表查询的参数
    const listParm = reactive<ListUserParm>({
        currentPage:1,
        pageSize:10,
        name:'',
        phone:'',
        total:0
    })
    //表格的数据
    const tableList = ref([])
    //列表
    const getList = async()=>{
        let res = await getListApi(listParm)
        console.log(res)
        if(res && res.code == 200){
            tableList.value = res.data.records;
            listParm.total = res.data.total;
        }
    }
    //搜索
    const searchBtn = ()=>{
        getList()
    }
    //重置按钮
    const resetBtn = ()=>{
        listParm.currentPage = 1;
        listParm.name = ''
        listParm.phone = ''
        getList()
    }
    //页容量改变时触发
    const sizeChange = (size:number)=>{
        listParm.pageSize = size;
        getList()
    }
    //页数改变时触发
    const currentChange = (page:number)=>{
        listParm.currentPage = page;
        getList()
    }
    onMounted(()=>{
        getList()
        //计算表格的高度
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