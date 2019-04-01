import Vue from 'vue'
import hashtag from './hash-tag.vue'

const HashTagConstructor = Vue.extend(hashtag)

export default function CreateShortcutItem (hashObj, fileName, index, callback) {
  const app = new HashTagConstructor({
    destroyed () {
      if(typeof callback === 'function') {
        callback()
      }
      console.log('hashtag destroyed')
    }
  })
  if (typeof hashObj === 'object' && typeof fileName === 'string') {
    app.$data.hashObj = hashObj
    app.$data.fileName = fileName
    app.$data.index = index
  } else {
    
  }

  app.$mount()
  return app
}
