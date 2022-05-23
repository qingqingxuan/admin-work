import { Ref, UnwrapRef } from 'vue'
import { RouteRecordRaw, RouteMeta, RouteRecordNormalized } from 'vue-router'

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
  children?: Array<RouteRecordNormalized>
  checked: Ref<UnwrapRef<boolean>>
}

export interface StateType {
  permissionRoutes: Array<RouteRecordRawWithHidden>
}

export interface StoreType {
  state: UnwrapRef<StateType>
  start: (params: any) => void
  getSplitTabs: () => Array<RouteRecordRawWithHidden>
  initPermissionRoute: (routes: Array<RouteRecordRaw>) => void
  isEmptyPermissionRoute: () => boolean
  reset: () => void
}
