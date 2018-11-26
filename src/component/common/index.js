/** 组件注册 */
import VueClipboard from 'vue-clipboard2'
import Meta from 'vue-meta'

export default (Vue) => {
  Vue.use(VueClipboard)
  Vue.use(Meta)
}
