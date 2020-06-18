
let canvasCache = null

const memFontSize = (fontSizeInPx, fontFamily) => {
  return `${fontSizeInPx}px ${fontFamily}`
}

// http://stackoverflow.com/questions/16478836/measuring-length-of-string-in-pixel-in-javascript
export function measureTextWidth(str, fontSizeInPx = '12', fontFamily = 'sans-serif') {
  if (!canvasCache) {
    canvasCache = document.createElement('canvas')
  }
  let ctx = canvasCache.getContext('2d')
  ctx.font = memFontSize(fontSizeInPx, fontFamily)
  return ctx.measureText(str).width
}

export function truncateByWidth(str, maxWidth = 200, fontSize = 12, fontFamily = 'sans-serif') {
  // 算法：
  // 1. 先算文本一半的长度: halfWidth
  // 2. maxWidth < halfWidth 则递归
  // 3. halfWidth < maxWidth 则 width = maxWidth - halfWidth 再递归后半部分
  let strWidth = measureTextWidth(str, fontSize, fontFamily)
  if (strWidth <= maxWidth) {
    return str
  }
  let halfLen = Math.floor(str.length / 2)
  if (halfLen === 0 || maxWidth <= measureTextWidth('...', fontSize, fontFamily)) {
    return '...'
  }
  let headHalfStr = str.substr(0, halfLen)
  let headHalfWidth = measureTextWidth(headHalfStr, fontSize, fontFamily)
  if (headHalfWidth < maxWidth) {
    return headHalfStr + truncateByWidth(str.substr(halfLen), maxWidth - headHalfWidth, fontSize, fontFamily)
  }
  // maxWidth < headHalfWidth
  return truncateByWidth(headHalfStr, maxWidth, fontSize, fontFamily)
}
