import Vue from 'vue'
import ShortcutPanel from './panel-shortcut.vue'

const ShortcutPanelConstructor = Vue.extend(ShortcutPanel)

/**
 * 创建频道弹窗
 * @param options {string|object}
 * @returns *
 */
export default function CreateShortcutPanel (options, callback) {
  const app = new ShortcutPanelConstructor({
    destroyed () {
      alert('ffff');
    },
    mounted() {
     
    }
  })
  app.$mount()
  return app
}
