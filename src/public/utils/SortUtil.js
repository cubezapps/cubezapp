class SortUtil {
  static sortOn (arr, tags) {
    var dup = arr.slice()
    if (!arguments.length) return dup.sort()
    var args = Array.prototype.slice.call(tags)
    return dup.sort(function (a, b) {
      var props = args.slice()
      var prop = props.shift()
      while (a[prop] === b[prop] && props.length) prop = props.shift()
      return a[prop] === b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1
    })
  }
}

export default SortUtil
