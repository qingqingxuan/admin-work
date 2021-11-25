import '../assets/styles/transition.css'
import {
  NLayout,
  NLayoutContent,
  NConfigProvider,
  NScrollbar,
  NMenu,
  NBreadcrumb,
  NBreadcrumbItem,
  NTabs,
  NTabPane,
  NButton,
  NDropdown,
  NBadge,
  NDrawer,
  NDivider,
  NSwitch,
  NCard,
  NPopover,
  NInputGroup,
  NInput,
  NModal,
  NIcon,
  NBackTop,
  create,
  NMessageProvider,
  NAvatar,
  NDialogProvider,
  NGi,
  NGrid,
  NGridItem,
  NDrawerContent,
  NGlobalStyle,
  NElement,
  NLoadingBarProvider,
  NCheckbox,
  NCollapse,
  NCollapseItem,
  NTooltip,
  NForm,
  NFormItemGi,
  NFormItemGridItem,
  NSpace,
  NCheckboxGroup,
  NRadioGroup,
  NRadio,
  NRadioButton,
  NDatePicker,
  NTimePicker,
  NSelect,
  NTable,
  NDataTable,
  NFormItem,
  NTree,
  NTreeSelect,
  NPagination,
  NTag,
  NAlert,
  NImage,
  NNotificationProvider,
  NEllipsis,
  NProgress,
  NRate,
  NInputNumber,
  NSteps,
  NStep,
  NText,
  NGradientText,
  NSkeleton,
  NEmpty,
  NSpin,
  NPopselect,
  NDescriptions,
  NDescriptionsItem,
  NCascader,
  NImageGroup,
} from 'naive-ui'
import store from '../store'
import { App, inject } from 'vue'
import { StoreType } from '../types/store'

function registerElement(app: App) {
  const navie = create({
    components: [
      NLayout,
      NLayoutContent,
      NLoadingBarProvider,
      NConfigProvider,
      NGlobalStyle,
      NAvatar,
      NScrollbar,
      NMenu,
      NBreadcrumb,
      NBreadcrumbItem,
      NTabs,
      NTabPane,
      NButton,
      NDropdown,
      NCard,
      NBadge,
      NPopover,
      NDrawer,
      NDrawerContent,
      NDivider,
      NGi,
      NGrid,
      NGridItem,
      NSwitch,
      NInput,
      NInputGroup,
      NModal,
      NIcon,
      NBackTop,
      NMessageProvider,
      NDialogProvider,
      NNotificationProvider,
      NElement,
      NCollapse,
      NCollapseItem,
      NTooltip,
      NSpace,
      NTable,
      NDataTable,
      NPagination,
      NModal,
      NForm,
      NFormItem,
      NFormItemGi,
      NFormItemGridItem,
      NCheckboxGroup,
      NCheckbox,
      NRadioGroup,
      NRadio,
      NRadioButton,
      NDatePicker,
      NTimePicker,
      NSelect,
      NTree,
      NTreeSelect,
      NTag,
      NAlert,
      NImageGroup,
      NImage,
      NEllipsis,
      NProgress,
      NRate,
      NDatePicker,
      NTimePicker,
      NInputNumber,
      NSteps,
      NStep,
      NText,
      NGradientText,
      NProgress,
      NSkeleton,
      NEmpty,
      NSpin,
      NPopselect,
      NDescriptions,
      NDescriptionsItem,
      NCascader,
    ],
  })
  app.use(navie)
}

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
  if (options && options.registerElement === false) {
    if (import.meta.env.MODE === 'development') {
      console.warn('naive-ui components not be registed, please check `registerNaive` is `false`')
    }
  } else {
    registerElement(app)
  }
  delete options?.registerElement
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
