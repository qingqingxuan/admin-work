import { createApp } from 'vue'
import App from './App.vue'
import './styles'
import useGlobalComponents from './components'
import { useAppRouter } from './router'
import useRouterGuard from './router/guard'
import useAppPinia from './store'
import useMock from '../mock'
import '@arco-design/web-vue/dist/arco.css'

function vawBoot() {
  const app = createApp(App)
  useAppPinia(app)
  useGlobalComponents(app)
  useAppRouter(app)
  useRouterGuard()
  useMock()
  app.mount('#app')
}

vawBoot()
