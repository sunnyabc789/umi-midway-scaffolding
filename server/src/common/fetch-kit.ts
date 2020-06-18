
// the final fetch
// 仅仅使用post/get减少代码
// 所有的请求数据都被放在q=data....并压缩
// 在服务器端会被统一解压缩和传递给ctx.q
// options默认为空
// options.headers 默认是json header，但是你可以通过 options.headers 来覆盖默认的json header
// options.credentials 默认包含cookie，也是可以通过 options.credentials 来覆盖默认的credentials
// options.handleResponse 默认是转换为json, 如果不需要可以自己指定处理方法
// options.handleErr 默认是antd弹窗提示错误信息, 可以自己指定处理方法, 注意抛出的是整个response
import 'isomorphic-fetch'
import {tryJsonParse} from './sugo-utils'
const _ = require('lodash')

export function returnResult(ctx: any, result: any, code?: number , status?: any) {
  if (status) {
    ctx.status = status
  }
  return ctx.body = {
    result,
    code
  }
}

export function returnError(ctx: any, msg: any, status = 400) {
  ctx.status = status
  return ctx.body = {
    error: msg
  }
}


const toQueryParams = function (obj: any, prefix?: string): string {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + `[${p}]` : p
      const v = obj[p]
      str.push(typeof v === 'object' ?
        toQueryParams(v as any, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v))
    }
  }
  return str.join('&')
}

export const jsonHeader = {
  'Content-Type': 'application/json'
}

function parseResponse(response: any) {
  const res = response
  const contentType = res.headers.get('content-type') || ''
  const isJsonResult = contentType.toLowerCase().indexOf('application/json') !== -1
  if (isJsonResult) {
    try {
      return res.json()
    } catch (e) {
      return res.text()
    }
  } else {
    return res.text()
  }
}

function handleErr(res: any) {
  try {
    // 一定要try 因为如果是请求超时错误 是没有res.text()的
    return res.text()
      .then((text: any) => {
        const ret = tryJsonParse(text)
        text = ret.error || ret.message || JSON.stringify(text)
        // err(`fetch => ${res.url} => 错误信息:${text}`)
        const error: any = new Error(`请求错误：${res.status}:${text}`)
        error.response = res
        throw error
      })
  } catch (e) {
    // err(res, `${res.url} fetch err => 请求超时错误: ${res}`)
    const error: any = new Error(`请求超时错误：${res.url} ${res}`)
    error.response = res
    throw error
  }
}

export default class FetchKit {

  static get(url: string, data?: any, options?: any) {
    const queryStr = toQueryParams(data)
    return FetchKit.connect(queryStr ? `${url}?${queryStr}` : url, 'get', null, options)
  }

  static post(url: string, data?: any, options?: any) {
    return FetchKit.connect(url, 'post', data, options)
  }

  static delete(url: string, data?: any, options?: any) {
    return FetchKit.connect(url, 'delete', data, options)
  }

  static put(url: string, data?: any, options?: any) {
    return FetchKit.connect(url, 'put', data, options)
  }

  static connect(url: string, method: string, data?: any, options?: any) {
    const body = {
      method,
      body: data ? (typeof (data) === 'object' ? JSON.stringify(data) : data) : undefined,
      credentials: 'omit', // 忽略cookie的发送
      headers: jsonHeader,
      timeout: 15000,
      ...options
    }
    return fetch(url, body).then(res => {
      if (res.status > 304) {
        // err('ERROR request =>', url, JSON.stringify(body.body, null, 2))
        throw res
      }
      return res
    })
      .then(options.handleResponse || parseResponse, options.handleErr || handleErr)
  }
}

export const withFetchErrHandler = (func: any) => {
  return async (ctx: any, next: any) => {
    try {
      await func(ctx, next)
    } catch (e) {
      const status = _.get(e, 'response.status')
      if (status) {
        returnError(ctx, e.message, status)
      } else {
        throw e
      }
    }
  }
}
