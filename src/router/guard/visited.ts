import useVisitedRouteStore from '@/store/modules/visited-routes'
import { findAffixedRoutes } from '@/utils'
import { RouteRecordNormalized } from 'vue-router'
import router from '..'

function useVisitedGuard() {
  router.beforeEach((to) => {
    const visitedRouteStore = useVisitedRouteStore()
    if (!visitedRouteStore.affixRoutes || visitedRouteStore.affixRoutes.length === 0) {
      const affixRoutes = findAffixedRoutes(router.getRoutes())
      visitedRouteStore.initAffixRoutes(affixRoutes)
    }
    if (['404', '500', '403', 'not-found', 'Login'].includes(to.name as string)) {
      return true
    }
    if (to.path.startsWith('/redirect')) {
      return true
    }
    if (to.meta.noShowTabbar) {
      return true
    }
    if (to.query?.noShowTabbar) {
      return true
    }
    visitedRouteStore.addVisitedRoute(to as unknown as RouteRecordNormalized)
    return true
  })
}

export default useVisitedGuard
