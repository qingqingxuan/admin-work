import router, { constantRoutes } from '../router'
import Cookies from 'js-cookie'
import { post } from '@/api/http'
import store from '@/store/store'
import { baseAddress, getMenuListByRoleId } from '@/api/url'
import { RouteRecordRaw } from 'vue-router'
import { mapTwoLevelRouter, toHump } from '.'
import { Layout } from '@/components'
import layoutStore from '@/store'
import { defineAsyncComponent } from 'vue'

interface OriginRoute {
  menuUrl: string
  menuName?: string
  hidden?: boolean
  redirect?: string
  affix?: boolean
  cacheable?: boolean
  iconPrefix?: string
  icon?: string
  badge?: string | number
  children: Array<OriginRoute>
}

type RouteRecordRawWithHidden = RouteRecordRaw & { hidden: boolean }

function loadComponents() {
  return import.meta.glob('../views/**/*.vue')
}

const components = loadComponents()

function getRoutes() {
  return post({
    url: baseAddress + getMenuListByRoleId,
    method: 'POST',
    data: {
      userId: store.getters['user/userId'],
      roleId: store.getters['user/roleId'],
    },
  }).then((res: any) => {
    return generatorRoutes(res.data)
  })
}

function getComponent(it: OriginRoute) {
  return defineAsyncComponent({
    loader: components['../views' + it.menuUrl + '.vue'],
  })
}

function getCharCount(str: string, char: string) {
  const regex = new RegExp(char, 'g')
  const result = str.match(regex)
  const count = !result ? 0 : result.length
  return count
}

function isMenu(path: string) {
  return getCharCount(path, '/') === 1
}

function getNameByUrl(menuUrl: string) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

function generatorRoutes(res: Array<OriginRoute>) {
  const tempRoutes: Array<RouteRecordRawWithHidden> = []
  res.forEach((it) => {
    const route: RouteRecordRawWithHidden = {
      path: it.menuUrl,
      name: getNameByUrl(it.menuUrl),
      hidden: !!it.hidden,
      redirect: it.redirect || '',
      component: isMenu(it.menuUrl) ? Layout : getComponent(it),
      meta: {
        title: it.menuName,
        affix: !!it.affix,
        cacheable: !!it.cacheable,
        icon: it.icon || 'menu',
        iconPrefix: it.iconPrefix || 'iconfont',
        badge: it.badge,
      },
    }
    if (it.children) {
      route.children = generatorRoutes(it.children)
    }
    tempRoutes.push(route)
  })
  return tempRoutes
}

const whiteRoutes: string[] = ['/login']

function isTokenExpired(): boolean {
  const token = Cookies.get('p-admin-token')
  return !!token
}
router.beforeEach(async (to) => {
  if (whiteRoutes.includes(to.path)) {
    return true
  } else {
    if (!isTokenExpired()) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    } else {
      const isEmptyRoute = layoutStore.isEmptyPermissionRoute()
      if (isEmptyRoute) {
        // 加载路由
        const accessRoutes: Array<RouteRecordRaw> = []
        const tempRoutes = await getRoutes()
        accessRoutes.push(...tempRoutes)
        accessRoutes.push({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
          hidden: true,
        } as RouteRecordRaw)
        const mapRoutes = mapTwoLevelRouter(accessRoutes)
        mapRoutes.forEach((it: any) => {
          router.addRoute(it)
        })
        layoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
        return { ...to, replace: true }
      } else {
        return true
      }
    }
  }
})
