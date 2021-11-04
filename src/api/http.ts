import { AxiosResponse } from 'axios'
import { App } from '@vue/runtime-core'
import request from './axios.config'

export interface HttpOption {
  url: string
  data?: any
  method?: string
  headers?: any
  beforeRequest?: () => void
  afterRequest?: () => void
}

export interface Response {
  totalSize: number | 0
  code: number
  msg: string
  data: any
}

function http({ url, data, method, headers, beforeRequest, afterRequest }: HttpOption) {
  const successHandler = (res: AxiosResponse<Response>) => {
    if (res.data.code === 200) {
      return res.data
    }
    throw new Error(res.data.msg || '请求失败，未知异常')
  }
  const failHandler = (error: Response) => {
    afterRequest && afterRequest()
    throw new Error(error.msg || '请求失败，未知异常')
  }
  beforeRequest && beforeRequest()
  method = method || 'GET'
  const params = Object.assign(typeof data === 'function' ? data() : data || {}, {})
  return method === 'GET'
    ? request.get(url, { params }).then(successHandler, failHandler)
    : request.post(url, params, { headers: headers }).then(successHandler, failHandler)
}

export function get({
  url,
  data,
  method = 'GET',
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response> {
  return http({
    url,
    method,
    data,
    beforeRequest,
    afterRequest,
  })
}

export function post({
  url,
  data,
  method = 'POST',
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response> {
  return http({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  })
}

function install(app: App): void {
  app.config.globalProperties.$http = http

  app.config.globalProperties.$get = get

  app.config.globalProperties.$post = post
}

export default {
  install,
  get,
  post,
}

declare module '@vue/runtime-core' {
  // 为 `this.$` 提供类型声明
  interface ComponentCustomProperties {
    $get: (options: HttpOption) => Promise<Response>
    $post: (options: HttpOption) => Promise<Response>
  }
}
