import useVisitedRoute from '@/store/modules/visited-routes'
import router from '..'

function useVisitedGuard() {
  router.beforeEach((to) => {
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
    const visitedRoutesStore = useVisitedRoute()
    visitedRoutesStore.addVisitedRoute(to)
    return true
  })
}

export default useVisitedGuard
