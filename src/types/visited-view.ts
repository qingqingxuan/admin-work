import { RouteRecordRawWithHidden } from './store'

export default interface VisitedView {
  addVisitedView: (route: RouteRecordRawWithHidden) => Promise<RouteRecordRawWithHidden>
  removeVisitedView: (route: RouteRecordRawWithHidden) => Promise<RouteRecordRawWithHidden>
  closeLeftVisitedView: (route: RouteRecordRawWithHidden) => Promise<RouteRecordRawWithHidden>
  closeRightVisitedView: (route: RouteRecordRawWithHidden) => Promise<RouteRecordRawWithHidden>
  closeAllVisitedView: () => Promise<void>
  persistentVisitedView: () => void
  restoreVisitedView: () => void
}
