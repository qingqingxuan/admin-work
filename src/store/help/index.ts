import { isExternal, toHump } from '@/utils'
import { resolve } from 'path-browserify'
import { h, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { OriginRoute, SplitTab } from '../types'
import { MenuOption, NIcon } from 'naive-ui'
import SvgIcon from '@/components/svg-icon/index.vue'
import { asyncRoutes } from '@/router/routes/async'
import { LAYOUT } from '../keys'

export function loadComponents() {
  return import.meta.glob('/src/views/**/*.vue')
}

export const asynComponents = loadComponents()

export function getComponent(it: OriginRoute) {
  // return defineAsyncComponent({
  //   loader: asynComponents[getFilePath(it)],
  //   loadingComponent: LoadingComponent,
  // })
  return asynComponents[getFilePath(it)]
}

export function getFilePath(it: OriginRoute) {
  if (!it.localFilePath) {
    it.localFilePath = it.menuUrl
  }
  it.localFilePath = resolve('/', it.localFilePath)
  return '/src/views' + it.localFilePath + '.vue'
}

export function findRootPathRoute(routes: RouteRecordRaw[]) {
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

export function filterRoutesFromLocalRoutes(
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
      hidden: !!route.hidden,
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

export function isMenu(it: OriginRoute) {
  return it.children && it.children.length > 0
}

export function getNameByUrl(menuUrl: string) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

export function generatorRoutes(res: Array<OriginRoute>) {
  const tempRoutes: Array<RouteRecordRaw> = []
  res.forEach((it) => {
    const isMenuFlag = isMenu(it)
    const localRoute = isMenuFlag ? filterRoutesFromLocalRoutes(it, asyncRoutes) : null
    if (localRoute) {
      tempRoutes.push(localRoute as RouteRecordRaw)
    } else {
      const route: RouteRecordRaw = {
        path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
        name: it.routeName || getNameByUrl(it.menuUrl),
        component: isMenuFlag ? LAYOUT : getComponent(it),
        meta: {
          hidden: !!it.hidden,
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

export function mapTwoLevelRouter(srcRoutes: Array<RouteRecordRaw>) {
  function addParentRoute(routes: any, parent: any, parentPath: string) {
    routes.forEach((it: RouteRecordRaw) => {
      if (!isExternal(it.path)) {
        it.path = resolve(parentPath, it.path)
      }
      parent.push(it)
      if (it.children && it.children.length > 0) {
        addParentRoute(it.children, parent, it.path)
      }
    })
  }
  if (srcRoutes && srcRoutes.length > 0) {
    const tempRoutes = [] as Array<RouteRecordRaw>
    srcRoutes.forEach((it) => {
      const route = { ...it }
      const parentRoutes = [] as Array<RouteRecordRaw>
      if (route.children && route.children.length > 0) {
        addParentRoute(route.children, parentRoutes, route.path)
      }
      parentRoutes && parentRoutes.length > 0 && (route.children = parentRoutes)
      tempRoutes.push(route)
    })
    return tempRoutes
  }
  return []
}

export function findAffixedRoutes(routes: Array<RouteRecordRaw>) {
  const temp = [] as Array<RouteRecordRaw>
  routes.forEach((it) => {
    if (it.meta && it.meta.affix) {
      temp.push(it)
    }
  })
  return temp
}

export function findCachedRoutes(routes: Array<RouteRecordRaw>) {
  const temp = [] as Array<string>
  routes.forEach((it) => {
    if (it.name && it.meta && it.meta.cacheable) {
      temp.push(it.name as string)
    }
  })
  return temp
}

export function transfromMenu(originRoutes: Array<RouteRecordRaw>): Array<MenuOption> {
  function getLabel(item: RouteRecordRaw) {
    if (isExternal(item.path as string)) {
      return () =>
        h(
          'a',
          {
            href: item.path,
            target: '_blank',
            rel: 'noopenner noreferrer',
          },
          (item.meta as any).title
        )
    }
    return item.meta?.title || ''
  }
  if (!originRoutes) {
    return []
  }
  const tempMenus: Array<MenuOption> = []
  originRoutes
    .filter((it) => {
      if (!it.meta) {
        return false
      }
      return !it.meta.hidden
    })
    .forEach((it) => {
      const tempMenu = {
        key: it.path,
        label: getLabel(it),
        icon: renderMenuIcon(
          it.meta ? (it.meta.iconPrefix ? (it.meta.iconPrefix as string) : 'icon') : 'icon',
          it.meta?.icon
        ),
      } as MenuOption
      if (it.children) {
        if (it.meta && it.meta.isSingle && it.children.length === 1) {
          const item = it.children[0]
          tempMenu.key = resolve(tempMenu.key as string, item.path)
          tempMenu.label =
            item.meta && item.meta.title ? getLabel(item as RouteRecordRaw) : tempMenu.label
          tempMenu.icon =
            item.meta && item.meta.icon
              ? renderMenuIcon(
                  item.meta
                    ? item.meta.iconPrefix
                      ? (item.meta.iconPrefix as string)
                      : 'icon'
                    : 'icon',
                  item.meta?.icon
                )
              : tempMenu.icon
        } else {
          tempMenu.children = transfromMenu(it.children as RouteRecordRaw[])
        }
      }
      tempMenus.push(tempMenu)
    })
  return tempMenus
}

export function transformSplitTabMenu(routes: Array<RouteRecordRaw>): Array<SplitTab> {
  const tempTabs = [] as Array<SplitTab>
  routes.forEach((it) => {
    const splitTab: SplitTab = {
      label: it.meta ? (it.meta?.title as string) : '',
      fullPath: it.path || '',
      iconPrefix: it.meta?.iconPrefix || 'icon',
      icon: it.meta ? (it.meta?.icon as any) : undefined,
      children: it.children as RouteRecordRaw[],
      checked: ref(false),
    }
    tempTabs.push(splitTab)
  })
  return tempTabs
}

export function renderMenuIcon(iconPrefix: string, icon?: any) {
  if (!icon) {
    return undefined
  }
  return () =>
    h(NIcon, null, {
      default: () =>
        h(SvgIcon, {
          prefix: iconPrefix,
          name: icon,
        }),
    })
}

export function findRouteByUrl(routes: Array<any>, path: string): RouteRecordRaw | null {
  if (!path || !routes) {
    return null
  }
  let tempRoute = null
  for (let index = 0; index < routes.length; index++) {
    const temp = routes[index]
    if (temp.path === path) {
      tempRoute = temp
      return tempRoute
    }
    if (temp.children) {
      tempRoute = findRouteByUrl(temp.children, path)
      if (tempRoute) {
        return tempRoute
      }
    }
  }
  return null
}
