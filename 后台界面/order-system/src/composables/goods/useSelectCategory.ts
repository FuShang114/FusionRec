import { ref } from "vue";
import { getSelectApi } from "@/api/category";
export default function useSelectCategory(){
    //下拉数据
    const selectData = ref([])
    //获取数据
    const getSelect = async()=>{
        let res = await getSelectApi()
        if(res && res.code == 200){
            selectData.value = res.data
        }
    }
    return{
        selectData,
        getSelect
    }
}