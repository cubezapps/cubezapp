import addStyleMap from './add-style-map'
const { Win } = window

/**
 * 窗口风格控制
 * @param style {number} 风格名称
 * @param need {boolean} 是否需要
 */
function winStyleControl (style, need) {
  if (need) {
    Win.addStyle(style)
  } else {
    Win.removeStyle(style)
  }
}

export default {
  requestFullscreen () {
    return Win.setFullScreen(true)
  },
  exitFullscreen () {
    return Win.setFullScreen(false)
  },
  minimize () {
    return Win.minimize()
  },
  restore () {
    return Win.restore()
  },
  maximize () {
    return Win.maximize()
  },
  show () {
    return Win.show()
  },
  move () {
    return Win.move(...arguments)
  },
  resize (width, height) {
    return Win.resize(width, height)
  },
  hide () {
    return Win.hide()
  },
  close () {
    return Win.close()
  },
  /**
   * 设置任务栏覆盖图标
   * @param url {string}
   * @param name {string}
   * @return {*}
   */
  setOverlayIcon (url, name) {
    return Win.setOverlayIcon(url, name)
  },
  /**
   * 任务栏闪动
   * @param value {number}
   * @return {*}
   */
  flashTaskBar (value) {
    return Win.flashTaskBar(value)
  },
  /**
   * 设置窗口顶部是否吸附
   * @param {*} need 
   */
  setTopHide(val) {
    return Win.setTopHide(val)
  },
  /**
   * 是否需要系统拥有窗口WS_MAXIMIZEBOX属性
   * @param need {boolean}
   * @return {*}
   */
  needSystemMaximize (need = true) {
    return winStyleControl(addStyleMap.get('maxresizable'), need)
  },
    /**
   * 是否需要系统拥有窗口WS_MINIMIZEBOX属性
   * @param need {boolean}
   * @return {*}
   */
  needSystemMinimize (need = true) {
    return winStyleControl(addStyleMap.get('minresizable'), need)
  },
  /**
   * 是否需要窗口无边框
   * @param need {boolean}
   * @return {*}
   */
  needFrameless (need = true) {
    return winStyleControl(addStyleMap.get('frameless'), need)
  },
  /**
   * 是否需要任务栏
   * @param need {boolean}
   */
  needTaskBar (need = true) {
    return winStyleControl(addStyleMap.get('taskBar'), need)
  },
  /**
   * 是否需要阴影
   * @param need {boolean}
   */
  needShadow (need = true) {
    return winStyleControl(addStyleMap.get('shadow'), need)
  },
  /**
   * 是否需要一直处于最顶端
   * @param need
   */
  needAlwaysFront (need = true) {
    return winStyleControl(addStyleMap.get('alwaysFront'), need)
  },
  /**
   * 设置拖动改变大小的边框大小
   * @param width {number}
   * @return {*}
   */
  setResizeBorderWidth (width) {
    return Win.setNCBorderWidth(width)
  },
  /**
   * 设置窗口最小显示宽高
   * @param width {number}
   * @param height {number}
   * @return {*}
   */
  setMinSize (width, height) {
    return Win.setMinSize(width, height)
  },
  /**
   * 设置窗口最大显示宽高
   * @param width {number}
   * @param height {number}
   * @return {*}
   */
  setMaxSize (width, height) {
    return Win.setMaxSize(width, height)
  },
  /**
   * 设置窗口位于最顶端
   * @return {*}
   */
  bringToFront () {
    return Win.bringToFront()
  },
  /**
   * 设置窗口可拖动区域
   * @param area {array} eg: [[x, y, width, height], [x, y, width, height]...]
   * @return {*|void}
   */
  setDragArea (area) {
    return Win.setCaptionArea(area)
  },
  /**
   * 注册事件
   * @param type {string}
   * @param listener {function}
   * @return {*}
   */
  regEvent (type, listener) {
    return Win.regEvent(type, listener)
  },
  /**
   * 注入窗口
   */
  injectOverlay (isInject, json) {
    // QVariantMap data;
    // data["transparent"] = false;
    // data["resizable"] = false;
    // data["maxWidth"] = 1280;
    // data["maxHeight"] = 720;
    // data["minWidth"] = 20;
    // data["minHeight"] = 20;
    // {
    //     QVariantMap captionRect;
    //     captionRect["leftMargin"] = 0;
    //     captionRect["rightMargin"] = 10;
    //     captionRect["topMargin"] = 0;
    //     captionRect["height"] = 100;
    //     data["captionRect"] = captionRect;
    // }
    return Win.InjectOverlay(isInject, JSON.stringify(json))
  }
}
