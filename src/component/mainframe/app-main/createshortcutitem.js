import Vue from 'vue'
import Shortcut from './shortcut-item.vue'

const ShortcutItemConstructor = Vue.extend(Shortcut)

export default function CreateShortcutItem (item, menus, callback) {
  const app = new ShortcutItemConstructor({
    destroyed () {
      if(typeof callback === 'function') {
        callback()
      }
    }
  })
  if (typeof item === 'object') {
    app.$data.item = item
    app.$data.menus = menus
  } else {
    Object.assign(app.$data, { message: item })
  }

  app.$mount()
  return app
}
