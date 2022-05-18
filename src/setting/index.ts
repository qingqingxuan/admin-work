const settingInfo = JSON.parse(localStorage.getItem('setting-info') || '{}')
interface Setting {
  projectName: string
  theme: 'light' | 'dark'
  sideTheme: 'dark' | 'white' | 'image'
  themeColor: string
  layoutMode: 'ltr' | 'ttb' | 'lcr'
  sideWidth: number
  pageAnim: 'fade' | 'opacity' | 'down' | 'scale'
  isFixedNavBar: boolean
  actionBar: {
    isShowSearch: boolean
    isShowMessage: boolean
    isShowRefresh: boolean
    isShowFullScreen: boolean
  }
}

export const projectName = 'Admin Work'

export default Object.assign(
  {
    theme: 'light',
    sideTheme: 'white',
    themeColor: 'blue@#409eff',
    layoutMode: 'ltr',
    sideWidth: 210,
    pageAnim: 'opacity',
    isFixedNavBar: true,
    actionBar: {
      isShowSearch: true,
      isShowMessage: true,
      isShowRefresh: true,
      isShowFullScreen: true,
    },
  },
  settingInfo
) as Setting
