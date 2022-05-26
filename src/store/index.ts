import { App } from 'vue'
import pinia from './pinia'

function useAppPinia(app: App) {
  app.use(pinia)
}

export default useAppPinia
