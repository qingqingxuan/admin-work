import { toHump } from '@/utils'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { CachedRouteState } from '../types'

const useCachedRoutes = defineStore('cached-routes', {
  state: () => {
    return {
      cachedRoute: [],
    } as CachedRouteState
  },
  getters: {
    getCachedRouteName(state) {
      return state.cachedRoute
    },
  },
  actions: {
    addCachedRoute(route: RouteRecordRaw) {
      if (route.name && route.meta && route.meta.cacheable) {
        const humName = toHump(route.name as string)
        if (!this.cachedRoute.includes(humName)) {
          this.cachedRoute.push(humName)
        }
      }
    },
    resetCachedRoutes() {
      this.$reset()
    },
  },
})

export default useCachedRoutes
