export interface RootState {
  root: string
}

export interface AppState {
  version: string
  appName: string
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

export interface ParentState {
  root: RootState
  user: UserState
  app: AppState
}
