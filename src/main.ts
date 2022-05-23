import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store/pinia'
import LayoutStore, { Layout } from './components/index'
import './styles/index.css'
import './icons/iconfont/iconfont.css'
import router from './router'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import 'virtual:svg-icons-register'
import useRouterGuard from './router/guard'
import '../mock'

console.log(Layout)

useRouterGuard()

const app = createApp(App)
app.use(LayoutStore)
app.use(pinia)
app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})
