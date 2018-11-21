import Vue from 'vue'
import App from './App.vue'
import { WebSDKPlugin } from './public/api/websdk'

Vue.config.productionTip = false
Vue.use(WebSDKPlugin)
new Vue({
  render: h => h(App),
}).$mount('#app')
