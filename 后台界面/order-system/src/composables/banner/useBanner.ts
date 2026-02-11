import { BannerType } from "@/api/banner/BannerModel";
import { EditType, FuncList } from "@/type/BaseType";
import { ref } from "vue";
import {deleteApi} from '@/api/banner/index'
import useInstance from "@/hooks/useInstance";
import { ElMessage } from "element-plus";
export default function useBanner(getList:FuncList){
    const {global} = useInstance()
    //新增弹框的ref属性
    const addRef = ref<{show:(type:string,row?:BannerType)=>void}>();
    //新增
    const addBtn = ()=>{
        addRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row:BannerType)=>{
        addRef.value?.show(EditType.EDIT,row)
    }
    //删除
    const deleteBtn =async (row:BannerType)=>{
        const confirm = await global.$myconfirm('确定删除吗？')
        if(confirm){
            let res = await deleteApi(row.banId)
            if(res && res.code == 200){
                ElMessage.success(res.msg)
                getList()
            }
        }
    }
    return{
        addRef,
        addBtn,
        editBtn,
        deleteBtn
    }
}