export const formatArrt = (attr: string, value: any) => {
  if (value) {
    return `${attr}="${value}"`
  }
  if (typeof value === 'boolean') {
    return value ? `${attr}` : `${attr}="${value}"`
  }
  return ''
}
