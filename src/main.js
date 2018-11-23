import Vue from 'vue'
import App from '@/module/App.vue'
import { WebSDKPlugin } from './public/api/websdk'
import router from './router/index'

Vue.config.productionTip = false
Vue.use(WebSDKPlugin)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
