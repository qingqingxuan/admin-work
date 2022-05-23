import '../assets/styles/transition.css'
import { App } from 'vue'

import DataForm from './common/DataForm'
import { projectName } from '../setting'
import { toHump } from '../utils'

function adapterNaiveCss() {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}

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

function install(app: App) {
  adapterNaiveCss()
  if (import.meta.env.MODE === 'development') {
    console.warn('install layout store start')
  }
  registerComponents(app)
  if (import.meta.env.MODE === 'development') {
    console.warn('install layout store end')
  }
}

export function useTitle(title: string) {
  document.title = projectName + ' | ' + (title || '')
}

export { default as Layout } from './Layout.vue'

export default {
  install,
}
