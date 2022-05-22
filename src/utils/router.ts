import router, { constantRoutes, asyncRoutes } from '../router'
import { post } from '@/api/http'
import { baseAddress, getMenuListByRoleId } from '@/api/url'
import { RouteRecordRaw } from 'vue-router'
import { isExternal, mapTwoLevelRouter, toHump } from '.'
import { Layout } from '@/components'
import layoutStore from '@/store'
import { defineAsyncComponent } from 'vue'
import LoadingComponent from '../components/loading/index.vue'
import { resolve } from 'path-browserify'
import { useUserStoreContext } from '@/store/modules/user'

interface OriginRoute {
  parentPath?: string
  menuUrl: string
  menuName?: string
  routeName?: string
  hidden?: boolean
  outLink?: string
  affix?: boolean
  cacheable?: boolean
  isRootPath?: boolean
  iconPrefix?: string
  icon?: string
  badge?: string | number
  isSingle?: boolean
  localFilePath?: string
  children?: Array<OriginRoute>
}

type RouteRecordRawWithHidden = RouteRecordRaw & { hidden: boolean }

/**
 * 这里的 defaultRoutes 是为了在一开始对接项目的时候，后端人员还没有准备好菜单接口，导致前端开发者不能进入主页面。
 * 所以这里返回默认的菜单数据，同时也向大家说明菜单数据的数据结构。后端的菜单接口一定要按这个格式去返回json数据，否则会解析菜单失败
 */
const defaultRoutes: OriginRoute[] = [
  {
    menuUrl: '/index',
    menuName: 'Dashborad',
    routeName: 'dashborad',
    icon: 'icon-dashboard',
    parentPath: '',
    children: [
      {
        parentPath: '/index',
        menuUrl: '/index/home',
        menuName: '主控台',
        routeName: 'home',
      },
      {
        parentPath: '/index',
        menuUrl: '/index/work-place',
        menuName: '工作台',
        routeName: 'workPlace',
      },
    ],
  },
  {
    menuUrl: '/system',
    menuName: '系统管理',
    icon: 'icon-settings',
    parentPath: '',
    routeName: 'system',
    children: [
      {
        parentPath: '/system',
        menuUrl: '/system/department',
        menuName: '部门管理',
        routeName: 'department',
        localFilePath: '/system/local-path/department',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/user',
        menuName: '用户管理',
        routeName: 'user',
        isRootPath: true,
      },
      {
        parentPath: '/system',
        menuUrl: '/system/role',
        menuName: '角色管理',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/menu',
        menuName: '菜单管理',
      },
    ],
  },
]

function loadComponents() {
  return import.meta.glob('../views/**/*.vue')
}

const asynComponents = loadComponents()

function getFilePath(it: OriginRoute) {
  if (!it.localFilePath) {
    it.localFilePath = it.menuUrl
  }
  it.localFilePath = resolve('/', it.localFilePath)
  return '../views' + it.localFilePath + '.vue'
}

async function getRoutes(data: { userId: number; roleId: number }) {
  try {
    if (getMenuListByRoleId) {
      const res = await post({
        url: baseAddress + getMenuListByRoleId,
        method: 'POST',
        // 在实际的开发中，这个地方可以换成 token，让后端解析用户信息获取 userId 和 roleId，前端可以不用传 userId 和 roleId。
        // 这样可以增加安全性
        data,
      })
      return generatorRoutes(res.data)
    } else {
      return generatorRoutes(defaultRoutes)
    }
  } catch (error) {
    console.log(
      '路由加载失败了，请清空一下Cookie和localStorage，重新登录；如果已经采用真实接口的，请确保菜单接口地址真实可用并且返回的数据格式和mock中的一样'
    )
    return []
  }
}

function getComponent(it: OriginRoute) {
  return defineAsyncComponent({
    loader: asynComponents[getFilePath(it)],
    loadingComponent: LoadingComponent,
  })
}

function findRootPathRoute(routes: RouteRecordRawWithHidden[]) {
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index]
    const rootRoute = route.children?.find((it) => it.meta && it.meta.isRootPath)
    if (rootRoute) {
      return rootRoute.path
    }
  }
  return routes && routes.length > 0 && routes[0].children && routes[0].children.length > 0
    ? routes[0].children![0].path
    : '/'
}

function filterRoutesFromLocalRoutes(
  route: OriginRoute,
  localRoutes: Array<RouteRecordRaw>,
  path = '/'
) {
  const filterRoute = localRoutes.find((it) => {
    return resolve(path, it.path) === route.menuUrl
  })
  if (filterRoute) {
    filterRoute.meta = {
      title: route.menuName,
      affix: !!route.affix,
      cacheable: !!route.cacheable,
      icon: route.icon || 'menu',
      iconPrefix: route.iconPrefix || 'iconfont',
      badge: route.badge,
      isRootPath: !!route.isRootPath,
      isSingle: !!route.isSingle,
      ...filterRoute.meta,
    }
    const parentPath = resolve(path, filterRoute.path)
    if (
      Array.isArray(route.children) &&
      route.children.length > 0 &&
      Array.isArray(filterRoute.children) &&
      filterRoute.children.length > 0
    ) {
      const tempChildren: RouteRecordRaw[] = []
      route.children.forEach((it) => {
        const childFilterRoute = filterRoutesFromLocalRoutes(it, filterRoute.children!, parentPath)
        childFilterRoute && tempChildren.push(childFilterRoute)
      })
      filterRoute.children = tempChildren
    }
  }
  return filterRoute
}

function isMenu(it: OriginRoute) {
  return it.children && it.children.length > 0
}

function getNameByUrl(menuUrl: string) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

function generatorRoutes(res: Array<OriginRoute>) {
  const tempRoutes: Array<RouteRecordRawWithHidden> = []
  res.forEach((it) => {
    const isMenuFlag = isMenu(it)
    const localRoute = isMenuFlag ? filterRoutesFromLocalRoutes(it, asyncRoutes) : null
    if (localRoute) {
      tempRoutes.push(localRoute as RouteRecordRawWithHidden)
    } else {
      const route: RouteRecordRawWithHidden = {
        path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
        name: it.routeName || getNameByUrl(it.menuUrl),
        hidden: !!it.hidden,
        component: isMenuFlag ? Layout : getComponent(it),
        meta: {
          title: it.menuName,
          affix: !!it.affix,
          cacheable: !!it.cacheable,
          icon: it.icon || 'menu',
          iconPrefix: it.iconPrefix || 'iconfont',
          badge: it.badge,
          isRootPath: !!it.isRootPath,
          isSingle: !!it.isSingle,
        },
      }
      if (it.children) {
        route.children = generatorRoutes(it.children)
      }
      tempRoutes.push(route)
    }
  })
  return tempRoutes
}

const whiteRoutes: string[] = ['/login', '/404', '/403', '/500']

router.beforeEach(async (to) => {
  if (whiteRoutes.includes(to.path)) {
    return true
  } else {
    const userStore = useUserStoreContext()
    if (userStore.isTokenExpire()) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    } else {
      const isEmptyRoute = layoutStore.isEmptyPermissionRoute()
      if (isEmptyRoute) {
        // 加载路由
        const accessRoutes = await getRoutes({ roleId: userStore.roleId, userId: userStore.userId })
        const mapRoutes = mapTwoLevelRouter(accessRoutes)
        mapRoutes.forEach((it: any) => {
          router.addRoute(it)
        })
        // 配置 `/` 路由的默认跳转地址
        router.addRoute({
          path: '/',
          redirect: findRootPathRoute(accessRoutes),
          hidden: true,
        } as RouteRecordRawWithHidden)
        // 这个路由一定要放在最后
        router.addRoute({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
          hidden: true,
        } as RouteRecordRawWithHidden)
        layoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
        return { ...to, replace: true }
      } else {
        return true
      }
    }
  }
})
