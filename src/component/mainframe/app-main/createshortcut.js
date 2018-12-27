import Vue from 'vue'
import Shortcut from './shortcut-tag.vue'

const ShortcutConstructor = Vue.extend(Shortcut)

export default function CreateShortcut (options, callback) {
  const app = new ShortcutConstructor({
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
