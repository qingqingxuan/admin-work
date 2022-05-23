import { Ref, UnwrapRef } from 'vue'
import { RouteRecordRaw, RouteMeta } from 'vue-router'

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
  children?: Array<RouteRecordRaw>
  checked: Ref<UnwrapRef<boolean>>
}

export interface StateType {
  permissionRoutes: Array<RouteRecordRawWithHidden>
}
