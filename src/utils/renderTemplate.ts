export const formatArrt = (attr: string, value: any) => {
  if (typeof value === 'boolean') {
    return value ? `${attr}` : ''
  }
  if (value === 'default') {
    return ''
  }
  if (value) {
    return `${attr}="${value}"`
  }
  return ''
}
