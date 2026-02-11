import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'
// import Layout from '../components/HelloWorld.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "/",
    redirect: '/login',
    children:[
      {
        path: "/login",
        component: () => import('@/views/login/login.vue'),
        name: "login"
      },
    ]
  },
  {
    name:'home',
    path: '/home',
    component: Layout,
    redirect:'/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        meta:{
          title:'首页'
        }
      },
      {
        path: '/banner',
        name: 'banner',
        component: () => import('@/views/banner/Index.vue'),
        meta:{
          title:'广告管理'
        }
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/category/Index.vue'),
        meta:{
          title:'菜品分类'
        }
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/comment/Index.vue'),
        meta:{
          title:'评论管理'
        }
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/views/goods/Index.vue'),
        meta:{
          title:'菜品管理'
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/Index.vue'),
        meta:{
          title:'订单管理'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/Index.vue'),
        meta:{
          title:'用户管理'
        }
      },
      {
        path: '/reco',
        name: 'reco',
        component: () => import('@/views/reco/Index.vue'),
        meta: {
          title: '推荐引擎管理'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router