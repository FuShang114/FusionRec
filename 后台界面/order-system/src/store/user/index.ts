//引入store
import { defineStore } from "pinia";
//定义一个自己的store
export const userStore = defineStore('userStore', {
    //存储数据地方，存储count
    state: () => ({ 
        userId:''
    }),
    //获取state里面的数据
    getters: {
        getUserId(state){
            return state.userId
        }
    },
    //操作state里面的数据
    actions: {
        setUserId(userId:string) {
            this.userId = userId
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: sessionStorage, paths: ['userId'] }
        ],
    }
})