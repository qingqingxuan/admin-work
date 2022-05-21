import { createPinia } from 'pinia'
import PersistPlugin from './plugin/persist'

const pinia = createPinia()
pinia.use(PersistPlugin)

export default pinia
