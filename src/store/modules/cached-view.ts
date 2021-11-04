import CacheView from '../../types/cached-view'
import { RouteRecordRawWithHidden, StoreType } from '../../types/store'
import { toHump } from '../../utils'
export default {
  addCachedView(route: RouteRecordRawWithHidden) {
    if (route.name && route.meta && route.meta.cacheable) {
      const humName = toHump(route.name as string)
      if (!(this as any).state.cachedView.includes(humName)) {
        ;(this as StoreType).state.cachedView.push(humName)
      }
    }
  },
  removeCachedView(route) {
    const humName = toHump(route.name as string)
    const index = (this as StoreType).state.cachedView.indexOf(humName)
    if (index !== -1) {
      ;(this as StoreType).state.cachedView.splice(index, 1)
    }
  },
  resetCachedView() {
    // 从已经访问过的页面的数组中过滤可缓存的页面
    ;(this as StoreType).state.cachedView = (this as StoreType).state.visitedView
      .filter((it) => {
        return it.name && it.meta && it.meta.cacheable
      })
      .map((it) => toHump(it.name as string))
  },
} as CacheView
