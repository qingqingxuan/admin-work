import '../assets/styles/transition.css'
import store from '../store'
import { App, inject } from 'vue'
import { StoreType } from '../types/store'

import DataForm from './common/DataForm'
import { projectName } from '../setting'
import { toHump } from '../utils'

function getComponentName(key: string) {
  if (!key) {
    return ''
  }
  const paths = key.split('/')
  const name = paths
    .filter((it) => !!it && it !== '.')
    .reverse()
    .find((it) => it !== 'index.vue' && it !== 'index.ts' && it !== 'index.js')
    ?.replace('.vue', '')
  return name || ''
}

export function registerComponents(app: App) {
  const components = import.meta.globEager('./**.vue')
  Object.keys(components).forEach((it: string) => {
    const component = components[it]
    app.component(component.default.name || toHump(getComponentName(it)), component.default)
  })
  app.component('DataForm', DataForm)
}

const key = Symbol('layout_store')

function install(app: App, options?: any) {
  if (import.meta.env.MODE === 'development') {
    console.warn('install layout store start')
  }
  registerComponents(app)
  store.start(options || {})
  app.config.globalProperties.$layoutStore = store
  app.provide(key, store)
  if (import.meta.env.MODE === 'development') {
    console.warn('install layout store end')
  }
}

export function useLayoutStore() {
  return inject<StoreType>(key) as StoreType
}

export function useTitle(title: string) {
  document.title = projectName + ' | ' + (title || '')
}

export { default as Layout } from './Layout.vue'

export { mapTwoLevelRouter } from '../utils'

export default {
  install,
}
