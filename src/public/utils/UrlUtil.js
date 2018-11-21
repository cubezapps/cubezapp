class UrlUtil {
  static getParamValue (url, param) {
    var reg = new RegExp('[?&]' + param + '=([^&#]+)')
    var query = url.match(reg)
    return query ? query[1] : null
  }
}

export default UrlUtil
