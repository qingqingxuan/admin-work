import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import pinia from '../pinia'

// const LOCAL_STOREAGE_VISITED_KEY = 'admin-work-visited'

const useVisitedRouteStore = defineStore('visited-routes', {
  state: () => {
    return {
      visitedRoutes: [] as RouteRecordRaw[],
      affixRoutes: [] as RouteRecordRaw[],
    }
  },
  getters: {
    getVisitedRoutes(state) {
      return state.visitedRoutes
    },
  },
  actions: {
    initAffixRoutes(affixRoutes: RouteRecordRaw[]) {
      this.affixRoutes = affixRoutes
      this.visitedRoutes.unshift(...this.affixRoutes)
    },
    addVisitedRoute(route: RouteRecordRaw) {
      return new Promise((resolve) => {
        let isNewRoute = false
        if (!this.visitedRoutes.find((it) => it.path === route.path)) {
          isNewRoute = true
          this.visitedRoutes.push(route)
          // this.persistentVisitedView()
        }
        resolve({ route, isNewRoute })
      })
    },
    removeVisitedRoute(route: RouteRecordRaw) {
      return new Promise<string>((resolve) => {
        this.visitedRoutes.splice(this.visitedRoutes.indexOf(route), 1)
        resolve(this.findLastRoutePath())
      })
    },
    findLastRoutePath() {
      return this.visitedRoutes && this.visitedRoutes.length > 0
        ? this.visitedRoutes[this.visitedRoutes.length - 1].path
        : '/'
    },
    closeLeftVisitedView(selectRoute: RouteRecordRaw) {
      return new Promise((resolve) => {
        const selectIndex = this.visitedRoutes.indexOf(selectRoute)
        if (selectIndex !== -1) {
          this.visitedRoutes = this.visitedRoutes.filter((it, index) => {
            return (it.meta && it.meta.affix) || index >= selectIndex
          })
          // this.persistentVisitedView()
        }
        resolve(selectRoute)
      })
    },
    closeRightVisitedView(selectRoute: RouteRecordRaw) {
      return new Promise((resolve) => {
        const selectIndex = this.visitedRoutes.indexOf(selectRoute)
        if (selectIndex !== -1) {
          this.visitedRoutes = this.visitedRoutes.filter((it, index) => {
            return (it.meta && it.meta.affix) || index <= selectIndex
          })
          // this.persistentVisitedView()
        }
        resolve(selectRoute)
      })
    },
    closeAllVisitedView() {
      return new Promise<void>((resolve) => {
        this.visitedRoutes = this.visitedRoutes.filter((it) => {
          return it.meta && it.meta.affix
        })
        resolve()
      })
    },
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
  return useVisitedRouteStore(pinia)
}

export default useVisitedRouteStore
