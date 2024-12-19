declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'virtual:component-import?*' {
  const componentsGraph: any
  export { componentsGraph }
}
