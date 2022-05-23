import { findCachedRoutes } from '@/store/help'
import useCachedRouteStore from '@/store/modules/cached-routes'
import router from '..'

function useCachedGuard() {
  router.beforeEach(() => {
    const cachedRouteStore = useCachedRouteStore()
    if (cachedRouteStore.getCachedRouteName.length === 0) {
      cachedRouteStore.initCachedRoute(findCachedRoutes(router.getRoutes()))
    }
    return true
  })
}

export default useCachedGuard
