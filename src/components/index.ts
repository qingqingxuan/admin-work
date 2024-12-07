import { App } from 'vue'
import { initFileGraph } from '@/utils/FileGraph'

function adapterNaiveCss() {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}

export function registerComponents(app: App) {
  const components = import.meta.glob('/src/components/**/**.{vue,tsx}', { eager: true }) as any
  const fileGraph = initFileGraph(components)
  Object.keys(fileGraph).forEach((it: string) => {
    app.component(
      fileGraph[it].componentName,
      fileGraph[it].templateFile
        ? components[fileGraph[it].templateFile].default
        : fileGraph[it].component
    )
  })
}

function useGlobalComponents(app: App) {
  adapterNaiveCss()
  registerComponents(app)
}

export default useGlobalComponents
