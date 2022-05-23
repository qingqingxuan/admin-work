import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'
import { SplitTab } from '../types/store'
import { DataTableColumn, MenuOption, NIcon, TreeSelectOption } from 'naive-ui'
import { h, ref } from 'vue'
import SvgIcon from '../components/svg-icon/index.vue'
import { TablePropsType } from '@/types/components'

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function uuid() {
  const s: Array<any> = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  const uuid = s.join('')
  return uuid
}

export function randomString(length: number) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str: string): string {
  if (!str) return str
  return str
    .replace(/\-(\w)/g, function (all, letter) {
      return letter.toUpperCase()
    })
    .replace(/(\s|^)[a-z]/g, function (char) {
      return char.toUpperCase()
    })
}

export function mapTwoLevelRouter(srcRoutes: Array<RouteRecordRaw>) {
  function addParentRoute(routes: any, parent: any, parentPath: string) {
    routes.forEach((it: RouteRecordRaw) => {
      if (!isExternal(it.path)) {
        it.path = path.resolve(parentPath, it.path)
      }
      parent.push(it)
      if (it.children && it.children.length > 0) {
        addParentRoute(it.children, parent, it.path)
      }
    })
  }
  if (srcRoutes && srcRoutes.length > 0) {
    const tempRoutes = [] as Array<any>
    srcRoutes.forEach((it) => {
      const route = { ...it }
      const parentRoutes = [] as Array<any>
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

export function findAffixedRoutes(routes: Array<RouteRecordNormalized>) {
  const temp = [] as Array<RouteRecordNormalized>
  routes.forEach((it) => {
    if (it.meta && it.meta.affix) {
      temp.push(it)
    }
  })
  return temp
}

export function findCachedRoutes(routes: Array<RouteRecordNormalized>) {
  const temp = [] as Array<string>
  routes.forEach((it) => {
    if (it.name && it.meta && it.meta.cacheable) {
      temp.push(it.name as string)
    }
  })
  return temp
}

export function transfromRoutes(
  originRoutes: Array<RouteRecordRaw>,
  parentPath = '/'
): Array<RouteRecordRaw> | undefined {
  if (!originRoutes) {
    return undefined
  }
  const tempRoutes: Array<RouteRecordRaw> = []
  originRoutes.forEach((it) => {
    const tempRoute = {
      ...it,
      fullPath: isExternal(it.path) ? it.path : path.resolve(parentPath, it.path),
    } as unknown as RouteRecordRaw
    if (tempRoute.children) {
      tempRoute.children = transfromRoutes(tempRoute.children as RouteRecordRaw[], tempRoute.path)!
    }
    tempRoutes.push(tempRoute)
  })
  return tempRoutes
}

export function transfromMenu(originRoutes: Array<RouteRecordNormalized>): Array<MenuOption> {
  function getLabel(item: RouteRecordNormalized) {
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
          tempMenu.key = path.resolve(tempMenu.key as string, item.path)
          tempMenu.label =
            item.meta && item.meta.title ? getLabel(item as RouteRecordNormalized) : tempMenu.label
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
          tempMenu.children = transfromMenu(it.children as RouteRecordNormalized[])
        }
      }
      tempMenus.push(tempMenu)
    })
  return tempMenus
}

export function transformSplitTabMenu(routes?: Array<RouteRecordNormalized>): Array<SplitTab> {
  if (!routes) {
    return [] as Array<SplitTab>
  }
  const tempTabs = [] as Array<SplitTab>
  routes.forEach((it) => {
    const splitTab: SplitTab = {
      label: it.meta ? (it.meta?.title as string) : '',
      fullPath: it.path || '',
      iconPrefix: it.meta?.iconPrefix || 'icon',
      icon: it.meta ? (it.meta?.icon as any) : undefined,
      children: it.children as RouteRecordNormalized[],
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

export function sortColumns(originColumns: DataTableColumn[], newColumns: TablePropsType[]) {
  if (!originColumns || !newColumns) {
    return
  }
  if (newColumns.length === 0) {
    originColumns.length = 0
  } else {
    const selectionItem = originColumns.find((it) => it.type === 'selection')
    originColumns.length = 0
    if (selectionItem) {
      originColumns.push(selectionItem)
    }
    originColumns.push(...newColumns)
  }
}

export function transformTreeSelect(
  origin: any[],
  labelName: string,
  keyName: string
): TreeSelectOption[] {
  const tempSelections: TreeSelectOption[] = []
  origin.forEach((it) => {
    const selection = {
      label: it[labelName],
      key: it[keyName],
    } as TreeSelectOption
    if (it.children) {
      selection.children = transformTreeSelect(it.children, labelName, keyName)
    }
    tempSelections.push(selection)
  })
  return tempSelections
}

export function findRouteByUrl(routes: Array<any>, path: string): RouteRecordNormalized | null {
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
