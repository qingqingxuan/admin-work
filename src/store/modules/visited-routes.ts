import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'
import pinia from '../pinia'
import { VisitedRouteState } from '../types'

// const LOCAL_STOREAGE_VISITED_KEY = 'admin-work-visited'

const useVisitedRoutes = defineStore('visited-routes', {
  state: () => {
    return {
      visitedRoutes: [],
    } as VisitedRouteState
  },
  getters: {
    getVisitedRoutes(state) {
      return state.visitedRoutes
    },
  },
  actions: {
    initAffixRoutes(affixRoutes: RouteLocationNormalized[]) {
      affixRoutes.forEach((it) => {
        this.addVisitedRoute(it)
      })
    },
    addVisitedRoute(route: RouteLocationNormalized) {
      return new Promise((resolve) => {
        let isNewRoute = false
        if (!this.visitedRoutes.find((it) => it.fullPath === route.fullPath)) {
          isNewRoute = true
          this.visitedRoutes.push(route)
          // this.persistentVisitedView()
        }
        resolve({ route, isNewRoute })
      })
    },
    removeVisitedRoute(route: RouteLocationNormalized) {
      return new Promise<string>((resolve) => {
        this.visitedRoutes.splice(this.visitedRoutes.indexOf(route), 1)
        // ;(this as StoreType).persistentVisitedView()
        // ;(this as StoreType).removeCachedView && (this as StoreType).removeCachedView(route)
        resolve(this.findLastRoutePath())
      })
    },
    findLastRoutePath() {
      return this.visitedRoutes && this.visitedRoutes.length > 0
        ? this.visitedRoutes[this.visitedRoutes.length - 1].fullPath
        : '/'
    },
    // closeLeftVisitedView(selectRoute: RouteRecordRawWithHidden) {
    //   return new Promise((resolve) => {
    //     const selectIndex = this.visitedRoute.indexOf(selectRoute)
    //     if (selectIndex !== -1) {
    //       this.visitedRoute = this.visitedRoute.filter((it, index) => {
    //         return (it.meta && it.meta.affix) || index >= selectIndex
    //       })
    //       // this.persistentVisitedView()
    //     }
    //     // ;(this as StoreType).resetCachedView && (this as StoreType).resetCachedView()
    //     resolve(selectRoute)
    //   })
    // },
    // closeRightVisitedView(selectRoute: RouteRecordRawWithHidden) {
    //   return new Promise((resolve) => {
    //     const selectIndex = this.visitedRoute.indexOf(selectRoute)
    //     if (selectIndex !== -1) {
    //       this.visitedRoute = this.visitedRoute.filter((it, index) => {
    //         return (it.meta && it.meta.affix) || index <= selectIndex
    //       })
    //       // this.persistentVisitedView()
    //     }
    //     // ;(this as StoreType).resetCachedView && (this as StoreType).resetCachedView()
    //     resolve(selectRoute)
    //   })
    // },
    // closeAllVisitedView() {
    //   return new Promise<void>((resolve) => {
    //     this.visitedRoute = this.visitedRoute.filter((it) => {
    //       return it.meta && it.meta.affix
    //     })
    //     // ;(this as StoreType).persistentVisitedView()
    //     // ;(this as StoreType).resetCachedView && (this as StoreType).resetCachedView()
    //     resolve()
    //   })
    // },
    // persistentVisitedView() {
    //   const tempPersistendRoutes = this.visitedRoute.map((it) => {
    //     return {
    //       fullPath: it.fullPath,
    //       meta: it.meta,
    //       name: it.name,
    //       params: it.params,
    //       path: it.path,
    //       query: it.query,
    //     }
    //   })
    //   localStorage.setItem(LOCAL_STOREAGE_VISITED_KEY, JSON.stringify(tempPersistendRoutes))
    // },
    restoreVisitedView() {
      this.$reset()
      // ;(this as StoreType).state.visitedView = [...(this as StoreType).state.visitedView]
      // const originRouteString = localStorage.getItem(LOCAL_STOREAGE_VISITED_KEY)
      // const persistentVisitedRoutes = JSON.parse(originRouteString || '[]')
      // persistentVisitedRoutes.forEach((originRoute: RouteRecordRawWithHidden) => {
      //   if (
      //     !(this as StoreType).state.visitedView.find(
      //       (it) => it.fullPath === originRoute.fullPath && it.name === originRoute.name
      //     )
      //   ) {
      //     ;(this as StoreType).state.visitedView.push(originRoute)
      //   }
      // })
    },
  },
})

export function useVisitedRoutesContext() {
  return useVisitedRoutes(pinia)
}

export default useVisitedRoutes
