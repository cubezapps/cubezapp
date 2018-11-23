import i18n from '@/i18n'
import Logger from '@/public/base/Logger'

export default {
  /** 数字前补0 */
  numPad: function (num, n) {
    // console.log('numPad', num, n);
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  },
  /** 获取路由参数 */
  getURLParam: function (name, url) {
    const re = new RegExp('[\\?&#]' + name + '=([^&#]+)', 'gi')
    const ma = (url || location.href).match(re)
    let strArr
    if (ma && ma.length > 0) {
      strArr = (ma[ma.length - 1])
      const _index = strArr.indexOf('=')
      return strArr.substring(_index + 1)
    }
    return ''
  }
}

/**
 * 获取视频网站语言
 * @param site {String} [facebook,youtube]
 * @return {String}
 */
export function getSiteLanguage (site) {
  const locale = i18n.locale
  if (site === 'youtube') {
    let lang = locale
    switch (locale) {
      case 'cn':
        lang = 'zh'
        break
      // no default
    }
    return lang
  } else if (site === 'facebook') {
    let lang = 'en_US'
    switch (locale) {
      case 'cn':
        lang = 'zh_CN'
        break
      case 'en':
        lang = 'en_US'
        break
      case 'ru':
        lang = 'ru_RU'
        break
      // no default
    }
    return lang
  }
  return locale
}

/**
 * 生产 n 位随机数
 * @param  {[Number]} bit [生成的位数]
 * @return {[String]}     [返回的随机数]
 */
export function randomNumSet (bit) {
  let len = bit
  let possible = '0123456789abcdefghijklmnopqrstuvwxyz'
  let i = 0
  let str = ''
  for (; i < len; i++) {
    str += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return str
}

/**
 * 函数防抖
 * @param fn {function}
 * @param wait {number}
 * @return {Function}
 */
export function debounce (fn, wait) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

/**
 * 函数节流
 * @param fn {function}
 * @param delay {number}
 * @return {Function}
 */
export function throttle (fn, delay) {
  let lastTime = 0
  return function () {
    const context = this
    const args = arguments
    let nowTime = Date.now()
    if (nowTime - lastTime > delay) {
      fn.apply(context, args)
      lastTime = nowTime
    }
  }
}

/**
 * mouseWheel 值统一处理
 * @param event {WheelEvent}
 * @return {*}
 */
export function getMouseWheelDeltaY (event) {
  if (event.type === 'mousewheel') {
    return -1 / 40 * event.wheelDelta
  } else {
    return event.deltaY || event.detail
  }
}

/**
 * 设置 Cookie 值
 * @param {[String]} name [需要设置的 cookie 的 name]
 * @param {[String]} value [需要设置的 cookie 的 value]
 * @param {[Number]} Hours [需要设置的 cookie 的 有效时长（小时数），默认为 7 天]
 */
export function setCookie (name, value, Hours) {
  Hours = Hours || 168
  let d = new Date()
  let offset = 8
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000)
  let nd = utc + (3600000 * offset)
  let exp = new Date(nd)
  exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000)
  document.cookie = name + '=' + decodeURIComponent(value) + ';path=/;expires=' + exp.toGMTString() + ';'
}

/**
 * 获取 cookie 值
 * @param  {[String]} name [传入需要获取的 cookie 的 name]
 * @return {[String]}
 */
export function getCookie (name) {
  let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
  if (arr != null) return encodeURIComponent(arr[2])
  return null
}

/**
 * md5加密函数，
 * hex_md5("") -- 16位加密
 * hex_md5("",32) -- 32位加密
 * @param  {[String]} sMessage [需要加密的字符串]
 * @param  {[Number]} bit      [加密返回的位数]
 * @return {[String]}          [返回md5加密后的字符串]
 */
export function hexmd5 (sMessage, bit) {
  function RotateLeft (lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
  }

  function AddUnsigned (lX, lY) {
    var lX4, lY4, lX8, lY8, lResult
    lX8 = (lX & 0x80000000)
    lY8 = (lY & 0x80000000)
    lX4 = (lX & 0x40000000)
    lY4 = (lY & 0x40000000)
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
      else return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
    } else return (lResult ^ lX8 ^ lY8)
  }

  function F (x, y, z) {
    return (x & y) | ((~x) & z)
  }

  function G (x, y, z) {
    return (x & z) | (y & (~z))
  }

  function H (x, y, z) {
    return (x ^ y ^ z)
  }

  function I (x, y, z) {
    return (y ^ (x | (~z)))
  }

  function FF (a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac))
    return AddUnsigned(RotateLeft(a, s), b)
  }

  function GG (a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac))
    return AddUnsigned(RotateLeft(a, s), b)
  }

  function HH (a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac))
    return AddUnsigned(RotateLeft(a, s), b)
  }

  function II (a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac))
    return AddUnsigned(RotateLeft(a, s), b)
  }

  function ConvertToWordArray (sMessage) {
    let lWordCount
    let lMessageLength = sMessage.length
    let lNumberOfWordsTemp1 = lMessageLength + 8
    let lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
    let lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
    let lWordArray = Array(lNumberOfWords - 1)
    let lBytePosition = 0
    let lByteCount = 0
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount) << lBytePosition))
      lByteCount++
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
    return lWordArray
  }

  function WordToHex (lValue) {
    let WordToHexValue = ''
    let WordToHexValueTemp = ''
    let lByte = ''
    let lCount = ''
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255
      WordToHexValueTemp = '0' + lByte.toString(16)
      WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
    }
    return WordToHexValue
  }
  let x = []
  let k
  let AA
  let BB
  let CC
  let DD
  let a
  let b
  let c
  let d
  let S11 = 7
  let S12 = 12
  let S13 = 17
  let S14 = 22
  let S21 = 5
  let S22 = 9
  let S23 = 14
  let S24 = 20
  let S31 = 4
  let S32 = 11
  let S33 = 16
  let S34 = 23
  let S41 = 6
  let S42 = 10
  let S43 = 15
  let S44 = 21
  // Steps 1 and 2. Append padding bits and length and convert to words
  x = ConvertToWordArray(sMessage)
  // Step 3. Initialise
  a = 0x67452301
  b = 0xEFCDAB89
  c = 0x98BADCFE
  d = 0x10325476
  // Step 4. Process the message in 16-word blocks
  for (k = 0; k < x.length; k += 16) {
    AA = a
    BB = b
    CC = c
    DD = d
    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
    d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244)
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314)
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
    a = AddUnsigned(a, AA)
    b = AddUnsigned(b, BB)
    c = AddUnsigned(c, CC)
    d = AddUnsigned(d, DD)
  }
  if (bit === 32) {
    return WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)
  } else {
    return WordToHex(b) + WordToHex(c)
  }
}

export function getBrowserLang () {
  const browLang = window.navigator.language || window.navigator.userLanguage
  if (/cn/i.test(browLang)) {
    return 'cn'
  } else if (/ru/i.test(browLang)) {
    return 'ru'
  } else {
    return 'en'
  }
}

export function destroyIframe (iframe) {
  iframe.src = 'about:blank'
  try {
    iframe.contentWindow.document.write('')
    iframe.contentWindow.document.clear()
    iframe.contentWindow.close()
  } catch (e) {
  }
}

export function doubleDecode (str) {
  let result = str
  try {
    result = decodeURIComponent(decodeURIComponent(str))
  } catch (e) {
    Logger.log('double decode failed for ' + str, 'BaseUtil', true)
  }

  return result
}