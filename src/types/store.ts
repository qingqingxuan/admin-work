import { Ref, UnwrapRef } from 'vue'
import { RouteRecordRaw, RouteMeta } from 'vue-router'
import CacheView from './cached-view'
import VisitedView from './visited-view'

export interface RouteMetaType extends RouteMeta {
  icon?: string
  title?: string
  cacheable?: boolean
  affix?: boolean
}

export type RouteRecordRawWithHidden = RouteRecordRaw & {
  fullPath?: string
  icon?: string
  hidden?: boolean
  params?: Record<string, any>
  query?: Record<string, any>
}

export interface SplitTab {
  label: string
  iconPrefix?: string | unknown
  icon: string
  fullPath: string
  children?: Array<RouteRecordRawWithHidden>
  checked: Ref<UnwrapRef<boolean>>
}

export interface StateType {
  permissionRoutes: Array<RouteRecordRawWithHidden>
  visitedView: Array<RouteRecordRawWithHidden>
  cachedView: Array<string>
}

export interface StoreType extends CacheView, VisitedView {
  state: UnwrapRef<StateType>
  start: (params: any) => void
  getSplitTabs: () => Array<RouteRecordRawWithHidden>
  initPermissionRoute: (routes: Array<RouteRecordRaw>) => void
  isEmptyPermissionRoute: () => boolean
  reset: () => void
}
