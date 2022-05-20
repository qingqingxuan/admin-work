import { createApp } from 'vue'
import App from './App.vue'
import LayoutStore from './components/index'
import './styles/index.css'
import './icons/iconfont/iconfont.css'
import router from './router'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import 'virtual:svg-icons-register'
import './utils/router'
import '../mock'
import pinia from './store/pinia'

const app = createApp(App)
app.use(LayoutStore, {
  actions: {
    onPersonalCenter() {
      router.push('/personal')
    },
    onLogout() {
      router.push('/login')
    },
  },
})
app.use(pinia)
app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})
