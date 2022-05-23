import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { transfromRoutes } from '@/utils'

const usePermissionStore = defineStore('permission-route', {
  state: () => {
    return {
      permissionRoutes: [] as RouteRecordRaw[],
    }
  },
  getters: {
    getPermissionSideBar(state) {
      return state.permissionRoutes.filter((it) => {
        return it.meta && !it.meta.hidden && it.name
      })
    },
    getPermissionSplitTabs(state) {
      return state.permissionRoutes.filter((it) => {
        return it.meta && !it.meta.hidden && it.name && it.children && it.children.length > 0
      })
    },
  },
  actions: {
    initPermissionRoute(routes: Array<RouteRecordRaw>) {
      this.permissionRoutes = transfromRoutes(routes)
    },
    isEmptyPermissionRoute() {
      return !this.permissionRoutes || this.permissionRoutes.length === 0
    },
    reset() {
      this.$reset()
    },
  },
})

export default usePermissionStore
