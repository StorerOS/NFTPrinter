import dayjs from 'dayjs'

export function timeFormat(time, f) {
  if (!time) return ''
  const t = time * 1000
  if (!f) return dayjs(t).format('YYYY-MM-DD HH:mm:ss')
  return dayjs(t).format(f)
}

export function hiddenMiddleText(str, count = 4, length = 0) {
  if (!str) return ''
  const val = String(str)
  if (length === 0 || val.length > length) {
    return `${val.slice(0, count)}****${val.slice(-count)}`
  }
  return val
}
