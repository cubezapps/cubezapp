export const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
}

export const escapeRegExp = new RegExp(`[${Object.keys(escapeMap).join('')}]`, 'ig')

export function escapeHtml (str) {
  return str.replace(escapeRegExp, (match) => escapeMap[match])
}

export const unescapeMap = {
  '&amp;': '&',
  '&#38;': '&',
  '&#x26;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&#x3C;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&#x3E;': '>',
  '&quot;': '"',
  '&#34;': '"',
  '&#x22;': '"',
  '&apos;': '\'',
  '&#39;': '\'',
  '&#x27;': '\''
}

export const unescapeRegExp = new RegExp(`(${Object.keys(unescapeMap).join('|')})`, 'ig')

export function unescapeHtml (str) {
  return str.replace(unescapeRegExp, (match) => unescapeMap[match])
}
