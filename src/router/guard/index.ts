import useCachedGuard from './cached'
import usePermissionGuard from './permission'
import useVisitedGuard from './visited'

export default function useRouterGuard() {
  usePermissionGuard()
  useVisitedGuard()
  useCachedGuard()
}
