/** 组件注册 */
import VueClipboard from 'vue-clipboard2'
import Meta from 'vue-meta'
import VTooltip from 'v-tooltip'

export default (Vue) => {
  Vue.use(VueClipboard)
  Vue.use(Meta)
  Vue.use(VTooltip)
}
