import { mapTwoLevelRouter } from '@/utils'
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/components/Layout.vue')

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/index/home',
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    meta: {
      noShowTabbar: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)*',
        component: (): any => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/personal',
    name: 'personal',
    component: Layout,
    hidden: true,
    meta: {
      title: '个人中心',
    },
    children: [
      {
        path: '',
        component: () => import('@/views/personal/index.vue'),
        meta: {
          title: '个人中心',
        },
      },
    ],
  },
  {
    path: '/index',
    component: Layout,
    name: 'Index',
    meta: {
      title: 'Dashboard',
      iconPrefix: 'iconfont',
      icon: 'dashboard',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: (): any => import('@/views/index/main.vue'),
        meta: {
          title: '主控台',
          affix: true,
          cacheable: true,
          iconPrefix: 'iconfont',
          icon: 'menu',
        },
      },
      {
        path: 'work-place',
        name: 'WorkPlace',
        component: (): any => import('@/views/index/work-place.vue'),
        meta: {
          title: '工作台',
          iconPrefix: 'iconfont',
          icon: 'menu',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('@/views/exception/404.vue'),
  },
  {
    path: '/500',
    name: '500',
    hidden: true,
    component: () => import('@/views/exception/500.vue'),
  },
  {
    path: '/403',
    name: '403',
    hidden: true,
    component: () => import('@/views/exception/403.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: mapTwoLevelRouter(constantRoutes),
})

export default router
