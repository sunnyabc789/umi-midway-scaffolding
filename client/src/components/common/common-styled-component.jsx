import styled from '@emotion/styled'
import _ from 'lodash'


const DirectDict = {
  t: [0],
  r: [1],
  b: [2],
  l: [3],
  x: [1, 3],
  y: [0, 2],
  '': [0, 1, 2, 3]
}

function handleMargin(props) {
  let res = null
  _(props).keys().filter(k => _.startsWith(k, 'mg') && props[k]).map(k => k.match(/mg(\d+)(\D)?/)).forEach(([k, px, direction]) => {
    if (res === null) {
      res = [0, 0, 0, 0]
    }
    DirectDict[direction || ''].forEach(idx => res[idx] = px)
  })
  return res === null ? undefined : res.map(px => `${px}px`).join(' ')
}

function handlePadding(props) {
  let res = null
  _(props).keys().filter(k => _.startsWith(k, 'pd') && props[k]).map(k => k.match(/pd(\d+)(\D)?/)).forEach(([k, px, direction]) => {
    if (res === null) {
      res = [0, 0, 0, 0]
    }
    DirectDict[direction || ''].forEach(idx => res[idx] = px)
  })
  return res === null ? undefined : res.map(px => `${px}px`).join(' ')
}

function handleWidth(props) {
  let key = _.findKey(props, (v, k) => _.startsWith(k, 'width') && v)
  return !key
    ? undefined
    : _.startsWith(key, 'width-')
      ? `${key.substr(6)}%`
      : `${key.substr(5)}px`
}

function handleHeight(props) {
  let key = _.findKey(props, (v, k) => _.startsWith(k, 'height') && v)
  return !key
    ? undefined
    : _.startsWith(key, 'height-')
      ? `${key.substr(7)}%`
      : `${key.substr(6)}px`
}

function handleLineHeight(props) {
  let key = _.findKey(props, (v, k) => _.startsWith(k, 'lineheight') && v)
  return !key
    ? undefined
    : _.startsWith(key, 'lineheight-')
      ? `${key.substr(7)}%`
      : `${key.substr(6)}px`
}

function handleColor(props) {
  let key = _.findKey(props, (v, k) => _.startsWith(k, 'color-') && v)
  if (!key) {
    return undefined
  }
  let val = key.substr(6)
  return parseInt(val, 16) ? `#${val}` : val
}

function handleBackgroundColor(props) {
  let key = _.findKey(props, (v, k) => _.startsWith(k, 'bg-') && v)
  if (!key) {
    return undefined
  }
  let val = key.substr(3)
  return parseInt(val, 16) ? `#${val}` : val
}

function handleBorder(props, side = '') {
  const checker = `border${side}`

  let key = _.findKey(props, (v, k) => _.startsWith(k, checker) && v)
  if (!key) {
    return undefined
  }
  let [width = 1, style = 'solid', color = 'dcdcdc'] = key.substr(checker.length).split('-')
  return `${width || 1}px ${style} ${parseInt(color, 16) ? `#${parseInt(color, 16)}` : color}`
}

function handleSideBorder(side) {
  return props => handleBorder(props, side)
}

function readSuffixAsPx(prefix, defVal = 0) {
  let prefixLen = prefix.length
  return (props) => {
    let key = _.findKey(props, (v, k) => _.startsWith(k, prefix) && v)
    return key ? `${key.substr(prefixLen) || defVal}px` : undefined
  }
}

/**
 * Usage: <Box mg10x pd20y textCenter width300 width-100 height300 itblock font20 color-white bg-dcdcdc bold corner5 border />
 */
export const Box = styled.div`
  display: ${props => props.itblock ? 'inline-block' : props.block ? 'block' : undefined};
  vertical-align: ${props => props.itblock ? 'top' : undefined};
  text-align: ${props => props.textCenter ? 'center' : undefined};
  margin: ${handleMargin};
  padding: ${handlePadding};
  font-size: ${readSuffixAsPx('font')};
  font-weight: ${props => props.bold ? 'bold' : undefined};
  width: ${handleWidth};
  height: ${handleHeight};
  line-height: ${handleLineHeight};
  color: ${handleColor};
  background-color: ${handleBackgroundColor};
  border-radius: ${readSuffixAsPx('corner', 5)};
  border: ${handleBorder};
  border-top: ${handleSideBorder('t')};
  border-right: ${handleSideBorder('r')};
  border-bottom: ${handleSideBorder('b')};
  border-left: ${handleSideBorder('l')};
  text-decoration: ${props => props.deleteLine ? 'line-through' : undefined};
  position: ${props => props.relative ? 'relative' : props.absolute ? 'absolute' : undefined};
  top: ${readSuffixAsPx('top')};
  right: ${readSuffixAsPx('right')};
  bottom: ${readSuffixAsPx('bottom')};
  left: ${readSuffixAsPx('left')};
`

export const Text = Box.withComponent('span')
