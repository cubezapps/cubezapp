/**
 * 判断是否垂直可视区域
 * @param node {HTMLSelectElement} Node
 * @param parentsRect {Object<{left:Number,top:Number,right:Number,bottom:Number}>} 父级可视区域
 * @param threshold {Number} 判断阈值
 * @return {boolean}
 */
export function verticalInView (node, parentsRect, threshold = 100) {
  if (!node || (parentsRect.top === 0 && parentsRect.bottom === 0)) {
    return false
  }

  const nodeRect = node.getBoundingClientRect()
  const top = nodeRect.top
  const bottom = nodeRect.bottom
  const pTop = parentsRect.top - threshold
  const pBottom = parentsRect.bottom + threshold

  return !(top > pBottom || bottom < pTop)
}

/**
 * 判断是否水平可视区域
 * @param node {HTMLSelectElement} Node
 * @param parentsRect {Object<{left:Number,top:Number,right:Number,bottom:Number}>} 父级可视区域
 * @param threshold {Number} 判断阈值
 * @return {boolean}
 */
export function horizatalInView (node, parentsRect, threshold = 100) {
  if (!node || (parentsRect.left === 0 || parentsRect.right === 0)) {
    return false
  }

  const nodeRect = node.getBoundingClientRect()
  const left = nodeRect.left
  const right = nodeRect.right
  const pLeft = parentsRect.left - threshold
  const pRight = parentsRect.right + threshold

  return !(left < pLeft || right > pRight)
}
