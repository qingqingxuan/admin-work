import { mapTwoLevelRouter } from '@/store/help'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes/constants'

const router = createRouter({
  history: createWebHashHistory(),
  routes: mapTwoLevelRouter([...constantRoutes]),
})

export default router
