import Vue from 'vue'
import Shortcut from './shortcut-item.vue'

const ShortcutItemConstructor = Vue.extend(Shortcut)

export default function CreateShortcutItem (options, callback) {
  const app = new ShortcutItemConstructor({
    destroyed () {
      if(typeof callback === 'function') {
        callback()
      }
    }
  })
  if (typeof options === 'object') {
    Object.assign(app.$data, options)
  } else {
    Object.assign(app.$data, { message: options })
  }
  app.$mount()
  return app
}
