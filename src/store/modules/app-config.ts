import { defineStore } from 'pinia'

import defaultSetting from '@/setting'
import { LayoutMode, PageAnim, ThemeMode } from '../types'

const useAppConfigStore = defineStore('app-config', {
  state: () => {
    return { ...defaultSetting }
  },
  actions: {
    changeLayoutMode(mode: LayoutMode) {
      this.layoutMode = mode
      // presistSettingInfo(
      //   Object.assign(Setting, {
      //     layoutMode: mode,
      //   })
      // )
    },
    // changeDevice(device: DeviceType) {
    //   this.device = device
    // },
    changeTheme(theme: ThemeMode) {
      this.theme = theme
      // presistSettingInfo(
      //   Object.assign(Setting, {
      //     theme,
      //   })
      // )
    },
    // changeSideBarBgColor(colorName: SideTheme) {
    //   this.sideBarBgColor = colorName
    //   presistSettingInfo(
    //     Object.assign(Setting, {
    //       sideTheme: colorName,
    //     })
    //   )
    // },
    changePageAnim(pageAnim: PageAnim) {
      this.pageAnim = pageAnim
      // presistSettingInfo(
      //   Object.assign(Setting, {
      //     pageAnim,
      //   })
      // )
    },
    changePrimaryColor(item: string) {
      // this.themeOverrides.common.primaryColor = item
      // this.themeOverrides.common.primaryColorHover = item
      // presistSettingInfo(
      //   Object.assign(Setting, {
      //     themeColor: item.name + '@' + item.value,
      //   })
      // )
    },
  },
})

export default useAppConfigStore
