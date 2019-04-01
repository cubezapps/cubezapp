import Vue from 'vue'
import VueI18n from 'vue-i18n'
import WebSDK from '@/public/api/websdk'
import DataUri from '@/public/common/DataUri.js'

const DEFAULT_LANG = 'cn'
function getLocalLanguage () {
  let lang = localStorage.getItem('lang')
  if(lang == null) {
    lang = getNavigatorLanguage(navigator.language)
  }
  if(lang == null) {
    lang = DEFAULT_LANG
  }
  console.log(lang)
  return lang
}

export function getNavigatorLanguage (lang) {
  if (lang.startsWith('zh') || lang === 'cn') {
    return 'cn'
  }
  if (lang.startsWith('en')) {
    return 'en'
  }
  return 'en'
}

Vue.use(VueI18n)
// i18n 实例化
const locales = {
  cn: require('./lang/zh-CN.json'),
  en: require('./lang/en.json'),
}

const i18n = new VueI18n({
  locale: getLocalLanguage(),
  messages: locales,
  silentTranslationWarn: true
})

// 增加 setlocate方法
i18n.setLocale = async function (lang, doDispatch = false) {
  console.log(lang)
  if (!lang || lang === i18n.locale) {
    return
  }
  i18n.locale = lang
  document.documentElement.setAttribute('i18n', lang)
  if (doDispatch) {
    WebSDK('ipc.dispatchWindowEvent', DataUri.APP_LanguageChange, lang)
    WebSDK('common.setConfig', 'lang', lang)
  }
  localStorage.setItem('lang', lang)
}

export default i18n
