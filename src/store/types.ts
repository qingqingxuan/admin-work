export enum LayoutMode {
  LTR = 'ltr',
  LCR = 'lcr',
  TTB = 'ttb',
}

export enum DeviceType {
  PC = 'pc',
  PAD = 'pad',
  MOBILE = 'mobile',
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum SideTheme {
  DARK = 'dark',
  WHITE = 'white',
  BLUE = 'blue',
  IMAGE = 'image',
}

export enum PageAnim {
  FADE = 'fade',
  OPACITY = 'opacity',
  DOWN = 'down',
  SCALE = 'scale',
}

export interface UserState {
  userId: number
  token: string
  roleId: number
  roles: string[] | null
  userName: string
  nickName: string
  avatar: string
}

export interface AppConfigState {
  projectName: string
  theme: ThemeMode
  sideTheme: SideTheme
  themeColor: string
  layoutMode: LayoutMode
  sideWidth: number
  pageAnim: PageAnim
  isFixedNavBar: boolean
  actionBar: {
    isShowSearch: boolean
    isShowMessage: boolean
    isShowRefresh: boolean
    isShowFullScreen: boolean
  }
}
