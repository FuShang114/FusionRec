import { defineStore } from "pinia";
//定义store
//defineStore: 第一个参数id,是唯一的
export const testStore = defineStore('testStore', {
    state: () => {
        return {
            conunt: 0
        }
    },
    //获取state里面的数据
    getters:{
        getCount(state){
            return state.conunt
        }
    },
    actions:{
        //设置state里面的数据
        setCount(count:number){
            this.conunt = count;
        }
    }
})