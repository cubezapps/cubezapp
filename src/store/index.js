import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'

Vue.use(Vuex)

const store = new Vuex.Store({
  // strict: (config.env === 'production'), // 在非生产环境下，使用严格模式
  modules: {
    global
  }
})

store.register = (name, storeModule) => {
  if (!store.state[name]) {
    store.registerModule(name, storeModule)
  }
}

window.store = store

export default store
