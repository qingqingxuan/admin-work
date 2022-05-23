import { toHump } from '@/utils'
import { defineStore } from 'pinia'

const useCachedRouteStore = defineStore('cached-routes', {
  state: () => {
    return {
      cachedRoutes: [] as string[],
    }
  },
  getters: {
    getCachedRouteName(state) {
      return state.cachedRoutes
    },
  },
  actions: {
    initCachedRoute(routes: string[]) {
      this.cachedRoutes = routes.map((it) => {
        return toHump(it as string)
      })
    },
    resetCachedRoutes() {
      this.$reset()
    },
  },
})

export default useCachedRouteStore
