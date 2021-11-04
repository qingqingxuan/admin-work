import { RouteRecordRawWithHidden } from './store'

export default interface CacheView {
  addCachedView: (route: RouteRecordRawWithHidden) => void
  removeCachedView: (route: RouteRecordRawWithHidden) => void
  resetCachedView: () => void
}
