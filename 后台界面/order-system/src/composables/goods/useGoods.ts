import { GoodsType } from '@/api/goods/GoodsModel'
import { EditType, FuncList } from '@/type/BaseType'
import { reactive, ref } from 'vue'
import { deleteApi } from '@/api/goods'
import useInstance from '@/hooks/useInstance'
import { ElMessage } from 'element-plus'
export default function useGoods(getList:FuncList) {
    const { global } = useInstance()
    //新增弹框的ref属性
    const addRef = ref<{ show: (type: string, row?: GoodsType) => void }>()
    //新增
    const addBtn = () => {
        addRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: GoodsType) => {
        addRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async(row:GoodsType) => {
      let confirm = await  global.$myconfirm('确定删除该数据吗?')
      if(confirm){
        let res = await deleteApi(row.goodsId)
        if(res && res.code == 200){
            ElMessage.success(res.msg)
            //刷新表格
            getList()
        }
      }
    }
    return {
        addRef,
        addBtn,
        editBtn,
        deleteBtn
    }
}