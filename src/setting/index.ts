import { DeviceType } from './../store/types'
import { AppConfigState } from '@/store/types'

const settingInfo = JSON.parse(localStorage.getItem('setting-info') || '{}')

export const projectName = 'Admin Work'

export default Object.assign(
  {
    theme: 'light',
    sideTheme: 'white',
    themeColor: '#409eff',
    layoutMode: 'ltr',
    sideWidth: 210,
    deviceType: DeviceType.PC,
    pageAnim: 'opacity',
    isFixedNavBar: true,
    isCollapse: false,
    actionBar: {
      isShowSearch: true,
      isShowMessage: true,
      isShowRefresh: true,
      isShowFullScreen: true,
    },
  },
  settingInfo
) as AppConfigState
