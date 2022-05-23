import { StoreType, RouteRecordRawWithHidden, StateType } from './../types/store'
import { reactive } from 'vue'
import { transfromRoutes } from '../utils'
import { RouteRecordRaw } from 'vue-router'

const originState = {
  permissionRoutes: [],
} as StateType

const store: StoreType = {
  state: reactive<StateType>(originState),
  start({ state, actions }: any): void {
    state && (this.state = Object.assign(this.state, state))
    if (actions) {
      for (const key in actions) {
        ;(this as any)[key] = actions[key]
      }
    }
  },
  getSplitTabs() {
    return this.state.permissionRoutes.filter((it) => {
      return it.path && !it.hidden && it.children && it.children.length > 0
    }) as Array<RouteRecordRawWithHidden>
  },
  initPermissionRoute(routes: Array<RouteRecordRaw>) {
    const tempRoutes = transfromRoutes(routes) || []
    this.state.permissionRoutes.length = 0
    this.state.permissionRoutes.push(...tempRoutes)
  },
  isEmptyPermissionRoute() {
    return !this.state.permissionRoutes || this.state.permissionRoutes.length === 0
  },
  reset() {
    this.state = reactive<StateType>({
      permissionRoutes: [],
    })
  },
}

export default store
