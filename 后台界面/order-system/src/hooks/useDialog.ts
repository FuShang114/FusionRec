// hooks:可以重复使用
import { reactive } from 'vue';
export default function useDialog() {
    //定义弹框属性
    //ref: 定义简单、基础数据类型的响应式数据
    //reactive:复杂类型的响应式数据
    const dialog = reactive({
        title: '新增',
        visible: false,
        width: 600,
        height: 200
    })
    //弹框关闭
    const onClose = () => {
        dialog.visible = false;
    }
    //弹框确定
    const onConfirm = () => {
        dialog.visible = false
    }
    //显示弹框
    const onShow = () => {
        dialog.visible = true
    }
    return { //返回出去给页面使用
        dialog,
        onClose,
        onConfirm,
        onShow
    }
}