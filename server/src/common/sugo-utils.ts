import * as LZString from 'lz-string'
import * as _ from 'lodash'

/** get querystring 参数压缩加密 */
export const compressUrlQuery = (str: string | object, logTag?: string) => {
  if (_.isObject(str)) {
    str = JSON.stringify(str)
  }
  /*  if (logTag) {
      debug(str, 'before compress', logTag)
    } else {
      debug(str, 'before compress')
    }*/
  return LZString.compressToEncodedURIComponent(str as string)
}

/** get querystring 参数解密 */
export const decompressUrlQuery = (str: string) => LZString.decompressFromEncodedURIComponent(str)

/** 转换json对象异常处理 */
export function tryJsonParse(data: string | null | object, defaultVal = data) {
  if (_.isObject(data)) {
    return data
  }
  try {
    return JSON.parse(data as string)
  } catch (e) {
    return defaultVal
  }
}

const compFunc = (val1: any, val2: any) => {
  if (_.isFunction(val1) && _.isFunction(val2)) {
    return val1.toString() === val2.toString()
  }
}
/**
 * 用法和 isEqual 一样。不过对于函数值，会对比函数的 toString 结果
 */
export const isEqualWithFunc = (a: any, b: any) => {
  return _.isEqualWith(a, b, compFunc)
}

/**
 * 类似 _.update。不过没有副作用
 * @param objOrArr
 * @param path
 * @param updater 传入的这个函数不能直接修改原对象，应该返回一个新的对象
 * @returns {*}
 */
export function immutateUpdate(objOrArr: any, path: string | any[], updater: (val: any) => any): any {
  if (_.isArray(path) && !path.length) {
    return updater(objOrArr)
  }
  if (_.isString(path) || _.isNumber(path)) {
    const pathArr = _.toPath(path)
    return immutateUpdate(objOrArr, pathArr, updater)
  }
  const [headKey, ...restKeys] = path
  const prevVal = objOrArr && (objOrArr as any)[headKey]
  const newVal = immutateUpdate(prevVal, restKeys, updater)

  // 如果值没有变，则直接返回
  if (prevVal === newVal) {
    return objOrArr
  }

  if (_.isArray(objOrArr) || (!objOrArr && isFinite(headKey))) {
    const newArr = _.clone(objOrArr || [])
    newArr[headKey] = newVal
    return newArr
  }

  //  {...objOrArr, [headKey]: newVal} can not clone type
  const newObj: any = _.clone(objOrArr) || {}
  newObj[headKey] = newVal
  return newObj
}

/**
 * 对一个对象进行批量修改，返回一个新对象
 * @example immutateUpdates(obj, 'a.b', () => 1, 'c.d', v => v + 1)
 * @param objOrArr
 * @param pathAndUpdaters
 */
export function immutateUpdates(objOrArr: any, ...pathAndUpdaters: any[]): any {
  if (_.isEmpty(pathAndUpdaters)) {
    return objOrArr
  }
  const [path, updater, ...rest] = pathAndUpdaters
  return immutateUpdates(immutateUpdate(objOrArr, path, updater), ...rest)
}

/**
 * 结合了 map 和 Promise.all 的便捷 map
 * @param arr
 * @param mapper
 */
export function mapAwaitAll<T, R>(arr: T[], mapper: (v: T, index: number, arr: T[]) => Promise<R>): Promise<R[]> {
  return _.isEmpty(arr) ? Promise.resolve([]) : Promise.all(arr.map(mapper))
}

/**
 * 结合了 for 和 await 的工具函数
 * @param arr
 * @param mapper
 */
export async function forAwaitAll<T, R>(arr: T[], mapper: (v: T, index?: number, arr?: T[]) => any): Promise<R[]> {
  let res = []
  let i = 0
  for (let v of arr) {
    let r = await mapper(v, i++, arr)
    res.push(r)
  }
  return res
}

/**
 * 提取出路径中的文件名
 * @example
 * extractFileNameFromPath('/f/abcd.jpg') -> "abcd.jpg"
 * @param path
 */
export function extractFileNameFromPath(path: string) {
  const index = path.lastIndexOf('/')
  return path.substr(index + 1)
}

/**
 * 对比根据路径取得的目标值，不同返回 true
 * @param a
 * @param b
 * @param path
 * @returns {boolean}
 */
export function isDiffByPath(a: any, b: any, path: string | any[]) {
  return !_.isEqual(_.get(a, path), _.get(b, path))
}

/**
 * 深度clone对象
 * @param value
 */
export function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

/**
 * 条件生成className
 * @param o
 */
export function className(o: { [key: string]: boolean }): string {
  const names: string[] = []
  for (const name in o) {
    if (o[name]) {
      names.push(name)
    }
  }
  return names.join(' ')
}

/**
 * 类似 _.keyBy。不过能够多传一个参数，以便修改 key 对应的 val
 * @param arr
 * @param keySelector
 * @param valSelector
 */
export function dictBy<T, R>(arr: T[], keySelector: (v: T, pos: number) => string, valSelector: (v: T, pos: number) => R = _.identity) {
  return arr.reduce((prev: {[key: string]: R}, curr: T, pos) => {
    prev[keySelector(curr, pos)] = valSelector(curr, pos)
    return prev
  }, {})
}

export function getParameterByName(name: string, url: string) {
  if (!url) { url = window.location.href }
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if (!results) { return null }
  if (!results[2]) { return '' }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

/**
 * 等待一段时间，例子 await delayPromised(1000)
 * @param wait 等待的毫秒数
 */
export function delayPromised(wait: number) {
  return new Promise((resolve) => _.delay(resolve, wait))
}

/**
 * 将对象转换成 url 的 query 参数
 * 参考了：http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object/1714899#1714899
 * @example toQueryParams({a: 1, b: 2}) -> a=1&b=2
 * @param obj
 * @param prefix
 * @returns {string}
 */
export const toQueryParams = function(obj: {[key: string]: any}, prefix?: string): string {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[]' : p
      const v = obj[p]
      str.push(typeof v === 'object' ?
        toQueryParams(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v))
    }
  }
  return str.join('&')
}

export function isBotUserAgent(uaStr: string) {
  return /aolbuild|baidu|bingbot|bingpreview|msnbot|duckduckgo|adsbot-google|googlebot|mediapartners-google|teoma|slurp|yandex/i.test(uaStr)
}

/**
 * 在数组中插入元素
 * @example
 * interpose('a', [1, 2, 3]) => [1, "a", 2, "a", 3]
 * @param sep
 * @param arr
 */
export function interpose<S, E>(sep: S | ((el: E, i: number) => S), arr: E[]) {
  const zipped = _.zip(arr, arr.map(_.isFunction(sep) ? sep : () => sep))
  const butlast = _.flatten(zipped)
  return _.take(butlast, butlast.length - 1)
}

export const isEqualWithReactObj = _.partialRight(_.isEqualWith, function(val1: any, val2: any): any {
  if (_.isObject(val1) && _.isObject(val2) && '_owner' in val1 && '_owner' in val2) {
    return isEqualWithReactObj(_.omit(val1, '_owner'), _.omit(val2, '_owner'), undefined)
  }
  if (_.isFunction(val1) && _.isFunction(val2)) {
    return val1.toString() === val2.toString()
  }
})

/**
 * 递归查找，返回目标对象
 * @param arr  数组
 * @param getChild 如何取得 children 数组
 * @param predicate 判断函数
 * @returns {*}
 */
export const recurFindDeep = (arr: any[], getChild: any, predicate: (arg: any) => any): any => {
  const thisLayerCh = _.find(arr, ch => predicate(ch) || recurFindDeep(getChild(ch), getChild, predicate))
  return thisLayerCh && (predicate(thisLayerCh) ? thisLayerCh : recurFindDeep(getChild(thisLayerCh), getChild, predicate))
}

export function recurFlatten(tree: any[], childKey = 'children'): any[] {
  if (_.isEmpty(tree)) {
    return []
  }
  return _.flatMap(tree, n => n && [n, ...recurFlatten(n[childKey])] || [])
}

export function isDiffBySomePath(a: any, b: any, ...paths: any) {
  if (paths.length === 1 && _.isArray(paths[0])) {
    paths = paths[0]
  }
  return _.some(paths, path => isDiffByPath(a, b, path))
}

/**
 * 无副作用的 insert
 * @example
 * let a = ['a', 'b', 'c']
 * insert(a, 1, 'z') -> ['a', 'z', 'b', 'c']
 * a 保持不变
 * @param array
 * @param index
 * @param element
 */
export function insert<T>(array: T[], index: number, element: T) {
  return _.take(array, index).concat([element]).concat(_.drop(array, index))
}

/**
 * 无副作用的 move
 * @example
 * let arr = ['a', 'b', 'c']
 * move(arr, 0, 2) -> ['b', 'c', 'a']
 * arr 保持不变
 * @param arr
 * @param from
 * @param to
 * @returns {*}
 */
export function move<T>(arr: T[], from: number, to: number) {
  const elFrom = arr[from]
  if (from < to) {
    const removed = arr.filter((e, i) => i !== from)
    return insert(removed, to, elFrom)
  } else if (to < from) {
    const removed = arr.filter((e, i) => i !== from)
    return insert(removed, to, elFrom)
  } else {
    return arr
  }
}

/**
 * 无副作用的 swap
 * @example
 * let arr = ['a', 'b', 'c']
 * move(arr, 0, 2) -> ['c', 'b', 'a']
 * arr 保持不变
 * @param arr
 * @param from
 * @param to
 * @returns {*}
 */
export function swap<T>(arr: T[], from: number, to: number) {
  const res = _.clone(arr)
  res[from] = arr[to]
  res[to] = arr[from]
  return res
}
