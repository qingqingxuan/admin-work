import { AppConfigState } from '@/store/types'
import { createPinia } from 'pinia'
import { toRaw } from 'vue'
import { presistSettingInfo } from './modules/app-config'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    presist?: Partial<boolean>
  }
}

const pinia = createPinia()
pinia.use(({ options, store }) => {
  if (options.presist) {
    store.$subscribe((_, state) => {
      console.log(toRaw(state))
      presistSettingInfo(toRaw(state as unknown as AppConfigState))
    })
  }
})

export default pinia
