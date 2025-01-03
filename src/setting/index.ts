import {
  AppConfigState,
  DeviceType,
  LayoutMode,
  PageAnim,
  SideTheme,
  ThemeMode,
} from '@/store/types'

export const projectName = 'Admin Work'

export default {
  theme: ThemeMode.LIGHT,
  sideTheme: SideTheme.WHITE,
  themeColor: '#409eff',
  layoutMode: LayoutMode.LTR,
  sideWidth: 210,
  deviceType: DeviceType.PC,
  pageAnim: PageAnim.OPACITY,
  flexMainHeight: false,
  mainHeight: document.body.clientHeight,
  isFixedNavBar: true,
  isCollapse: false,
  actionBar: {
    isShowSearch: true,
    isShowMessage: true,
    isShowRefresh: true,
    isShowFullScreen: true,
  },
} as AppConfigState
