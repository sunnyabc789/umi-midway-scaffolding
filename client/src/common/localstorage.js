import {tryJsonParse} from './sugo-utils'
import _ from 'lodash'

const ls = window.localStorage

export const maxLSLength = 1000 * 50

export function get(key) {
  if (!key) {
    return null
  }
  return tryJsonParse(ls.getItem(key))
}

export function set(key, value) {
  let str = _.isString(value)
      ? value
      : JSON.stringify(value)

  if ((str || '').length > maxLSLength) {
    return console.log(`string size > ${maxLSLength}, choose not save it`, str)
  }

  return ls.setItem(
    key,
    str
  )
}

//get str
export function gets(key) {
  return ls.getItem(key)
}

export function clear(keys) {
  return keys.forEach(key => ls.removeItem(key))
}
