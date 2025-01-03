import { LAYOUT } from '@/store/keys'

export const asyncRoutes = [
  {
    path: '/index',
    component: LAYOUT,
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
        component: () => import('@vt/views/index/main'),
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
        component: () => import('@vt/views/index/work-place'),
        meta: {
          title: '工作台',
          affix: true,
          iconPrefix: 'iconfont',
          icon: 'menu',
        },
      },
    ],
  },
]
