import { App } from 'vue'
import pinia from './pinia'

function usePinia(app: App) {
  app.use(pinia)
}

export default usePinia
