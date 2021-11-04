import packageJson from '../../../package.json'
import { Module } from 'vuex'
import { AppState, RootState } from '../types'

export const appModule: Module<AppState, RootState> = {
  namespaced: true,
  state: {
    version: packageJson.version,
    appName: packageJson.name,
  },
  getters: {
    getVersion(state): string {
      return state.version
    },
    getAppName(state): string {
      return state.appName
    },
  },
  actions: {
    changeVersion({ commit }, newVersion) {
      commit('CHANGE_VERSION', newVersion)
    },
  },
  mutations: {
    CHANGE_VERSION(state, newVersion) {
      state.version = newVersion
    },
  },
}
