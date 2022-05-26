import { App } from 'vue'
import { toHump } from '../utils'

function adapterNaiveCss() {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}

function getComponentName(key: string) {
  const paths = key.split('/')
  const name = paths
    .filter((it) => !!it && it !== '.')
    .reverse()
    .find(
      (it) =>
        it !== 'index.vue' &&
        it !== 'index.ts' &&
        it !== 'index.tsx' &&
        it !== 'index.js' &&
        it !== 'index.jsx'
    )
    ?.replace('.vue', '')
  return name || ''
}

export function registerComponents(app: App) {
  const components = import.meta.globEager('./**/**.{vue,tsx}')
  Object.keys(components).forEach((it: string) => {
    const component = components[it]
    app.component(component.default.name || toHump(getComponentName(it)), component.default)
  })
}

function useGlobalComponents(app: App) {
  adapterNaiveCss()
  registerComponents(app)
}

export default useGlobalComponents
