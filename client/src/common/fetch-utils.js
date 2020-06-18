/**
 * Created by heganjie on 16/9/12.
 */

// import fetch from 'node-fetch'
import _ from 'lodash'

/**
 * 将对象转换成 url 的 query 参数
 * 参考了：http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object/1714899#1714899
 * @example toQueryParams({a: 1, b: 2}) -> a=1&b=2
 * @param obj
 * @param prefix
 * @returns {string}
 */
export const toQueryParams = function(obj, prefix = undefined) {
  let str = []
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + `[${p}]` : p,
        v = obj[p]
      str.push(typeof v === 'object' ?
        toQueryParams(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v))
    }
  }
  return str.join('&')
}

let r = /ie\s+v(\d+)/i
function getInternetExplorerVersion() {
  // document.body.className example: "ie v11.0 os-Windows 10 device-Other obsolete not-ok-browser 11.0.0"
  let m = document.body.className.match(r)
  return m ? +m[1] : -1
}

export const IE_VERSION = getInternetExplorerVersion()

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function parseJSON(response) {
  return response.json()
}

export const includeCookie = {
  credentials: 'include'
}

export const sendURLEncoded = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
}

export const sendJSON = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const sendFormData = {
  headers: {}
}

export const recvJSON = {
  headers: {
    Accept: 'application/json'
  }
}

export const noCache = IE_VERSION === -1
  ? {
    headers: {
      'cache-control': 'no-cache'
    }
  } : {
    headers: {
      'Cache-control': 'no-cache,no-store',
      'Pragma': 'no-cache',
      'Expires': 0
    }
  }


/**
 * 为 url 加入额外的参数，不支持带 hash 的 url
 * @param url
 * @param extraQuery
 * @returns {string}
 */
export function withExtraQuery(url, extraQuery = {}) {
  return _.isEmpty(extraQuery)
    ? url
    : `${url}${_.includes(url, '?') ? '&' : '?'}${toQueryParams(extraQuery)}`
}
