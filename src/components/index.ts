import { App, defineAsyncComponent } from 'vue'
import { componentsGraph } from 'virtual:component-import?path=src/components'

function adapterNaiveCss() {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}

export function registerComponents(app: App) {
  Object.values(componentsGraph).forEach((it: any) => {
    app.component(it.componentName, defineAsyncComponent(it.loader))
  })
}

function useGlobalComponents(app: App) {
  adapterNaiveCss()
  registerComponents(app)
}

export default useGlobalComponents
