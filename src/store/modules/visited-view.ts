import { RouteRecordRawWithHidden } from './../../types/store'
import { StoreType } from '../../types/store'
import VisitedView from '../../types/visited-view'

const LOCAL_STOREAGE_VISITED_KEY = 'admin-work-visited'

export default {
  addVisitedView(route) {
    return new Promise((resolve) => {
      if (!(this as StoreType).state.visitedView.find((it) => it.fullPath === route.fullPath)) {
        ;(this as StoreType).state.visitedView.push(route)
        this.persistentVisitedView()
      }
      ;(this as StoreType).addCachedView && (this as StoreType).addCachedView(route)
      resolve(route)
    })
  },
  removeVisitedView(route) {
    return new Promise((resolve) => {
      ;(this as StoreType).state.visitedView.splice(
        (this as StoreType).state.visitedView.indexOf(route),
        1
      )
      ;(this as StoreType).persistentVisitedView()
      ;(this as StoreType).removeCachedView && (this as StoreType).removeCachedView(route)
      resolve(route)
    })
  },
  closeLeftVisitedView(selectRoute) {
    return new Promise((resolve) => {
      const selectIndex = (this as StoreType).state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        ;(this as StoreType).state.visitedView = (this as StoreType).state.visitedView.filter(
          (it, index) => {
            return (it.meta && it.meta.affix) || index >= selectIndex
          }
        )
        this.persistentVisitedView()
      }
      ;(this as StoreType).resetCachedView && (this as StoreType).resetCachedView()
      resolve(selectRoute)
    })
  },
  closeRightVisitedView(selectRoute) {
    return new Promise((resolve) => {
      const selectIndex = (this as StoreType).state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        ;(this as StoreType).state.visitedView = (this as StoreType).state.visitedView.filter(
          (it, index) => {
            return (it.meta && it.meta.affix) || index <= selectIndex
          }
        )
        this.persistentVisitedView()
      }
      ;(this as StoreType).resetCachedView && (this as StoreType).resetCachedView()
      resolve(selectRoute)
    })
  },
  closeAllVisitedView() {
    return new Promise((resolve) => {
      ;(this as StoreType).state.visitedView = (this as StoreType).state.visitedView.filter(
        (it) => {
          return it.meta && it.meta.affix
        }
      )
      ;(this as StoreType).persistentVisitedView()
      ;(this as StoreType).resetCachedView && (this as StoreType).resetCachedView()
      resolve()
    })
  },
  persistentVisitedView() {
    const tempPersistendRoutes = (this as StoreType).state.visitedView.map((it) => {
      return {
        fullPath: it.fullPath,
        meta: it.meta,
        name: it.name,
        params: it.params,
        path: it.path,
        query: it.query,
      }
    })
    localStorage.setItem(LOCAL_STOREAGE_VISITED_KEY, JSON.stringify(tempPersistendRoutes))
  },
  restoreVisitedView() {
    ;(this as StoreType).state.visitedView = [...(this as StoreType).state.visitedView]
    const originRouteString = localStorage.getItem(LOCAL_STOREAGE_VISITED_KEY)
    const persistentVisitedRoutes = JSON.parse(originRouteString || '[]')
    persistentVisitedRoutes.forEach((originRoute: RouteRecordRawWithHidden) => {
      if (
        !(this as StoreType).state.visitedView.find(
          (it) => it.fullPath === originRoute.fullPath && it.name === originRoute.name
        )
      ) {
        ;(this as StoreType).state.visitedView.push(originRoute)
      }
    })
  },
} as VisitedView
