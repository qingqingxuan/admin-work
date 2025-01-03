import { AxiosResponse } from 'axios'
import { Message } from '@arco-design/web-vue'

export default function (response: AxiosResponse): AxiosResponse {
  if (response.status === 400) {
    Message.error('当前用户登录已过期，请重新登录')
    setTimeout(() => {
      // ;(store as any).onLogout && (store as any).onLogout()
    }, 1500)
  }
  return response
}
