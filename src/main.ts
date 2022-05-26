import { createApp } from 'vue'
import App from './App.vue'
import './styles'
import useGlobalComponents from './components'
import { useAppRouter } from './router'
import useRouterGuard from './router/guard'
import usePinia from './store'
import useMock from '../mock'

function boot() {
  const app = createApp(App)
  usePinia(app)
  useAppRouter(app)
  useGlobalComponents(app)
  useRouterGuard()
  useMock()
  app.mount('#app')
}

boot()
