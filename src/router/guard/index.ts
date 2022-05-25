import useCachedGuard from './cached'
import usePermissionGuard from './permission'
import usePageTitleGuard from './title'
import useVisitedGuard from './visited'

export default function useRouterGuard() {
  usePermissionGuard()
  useVisitedGuard()
  useCachedGuard()
  usePageTitleGuard()
}
