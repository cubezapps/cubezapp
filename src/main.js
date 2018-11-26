import Vue from 'vue'
import App from '@/module/App.vue'
import { WebSDKPlugin } from './public/api/websdk'
import router from './router/index'
import Logger from '@/public/base/Logger'
import install from '@/component/common'

Vue.config.productionTip = false
Vue.use(WebSDKPlugin)
install(Vue)
Logger.log('start to new Vue')
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
