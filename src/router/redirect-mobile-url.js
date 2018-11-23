import browser from '@/public/utils/browser'
import { webEnv, webEnvMap } from '@/config/web-dev'

/**
 * 路由重定向判断
 * @param to {object}
 * @param from {object}
 * @param next {function}
 */
export function redirect (to, from, next) {
  next()
  if (browser.mobile) {
    const host = (webEnvMap.get(webEnv) || webEnvMap.get('test')) + '.moschat.com'
    window.location.assign(`https://${host + location.pathname + location.search + location.hash}`)
  }
}
