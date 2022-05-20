import { defineStore } from 'pinia'

import defaultSetting from '@/setting'
import { LayoutMode, PageAnim, SideTheme, ThemeMode, DeviceType } from '../types'

import { useChangeMenuWidth } from '@/hooks/useMenuWidth'
useChangeMenuWidth(defaultSetting.sideWidth)

function presistSettingInfo(setting: any) {
  localStorage.setItem('setting-info', JSON.stringify(setting))
}

const useAppConfigStore = defineStore('app-config', {
  state: () => {
    return { ...defaultSetting }
  },
  getters: {
    getLayoutMode(state) {
      return state.layoutMode
    },
  },
  actions: {
    changeTheme(theme: ThemeMode) {
      this.theme = theme
      presistSettingInfo(
        Object.assign(this.$state, {
          theme,
        })
      )
    },
    changeLayoutMode(mode: LayoutMode) {
      this.layoutMode = mode
      presistSettingInfo(
        Object.assign(this.$state, {
          layoutMode: mode,
        })
      )
    },
    changeDevice(deviceType: DeviceType) {
      this.deviceType = deviceType
    },
    changeSideBarTheme(sideTheme: SideTheme) {
      this.sideTheme = sideTheme
      presistSettingInfo(
        Object.assign(this.$state, {
          sideTheme,
        })
      )
    },
    changePageAnim(pageAnim: PageAnim) {
      this.pageAnim = pageAnim
      presistSettingInfo(
        Object.assign(this.$state, {
          pageAnim,
        })
      )
    },
    changePrimaryColor(color: string) {
      this.themeColor = color
      presistSettingInfo(
        Object.assign(this.$state, {
          themeColor: color,
        })
      )
    },
    changeSideWith(sideWidth: number) {
      this.sideWidth = sideWidth
      const r = document.querySelector(':root') as HTMLElement
      r.style.setProperty('--menu-width', sideWidth + 'px')
      presistSettingInfo(
        Object.assign(this.$state, {
          sideWidth,
        })
      )
    },
    toggleCollapse(isCollapse: boolean) {
      this.isCollapse = isCollapse
      presistSettingInfo(
        Object.assign(this.$state, {
          isCollapse,
        })
      )
    },
  },
})

export default useAppConfigStore
