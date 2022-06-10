const formatArrt = (attr: string, value: any) => {
  if (value) {
    return `${attr}="${value}"`
  }
  if (typeof value === 'boolean') {
    return value ? `${attr}` : `${attr}="${value}"`
  }
  return ''
}

export default function(options: any) {
  const formItemAttrs = ['label', 'prop']
  const formItemAttrsStr = formItemAttrs.map(attr => formatArrt(attr, options[attr])).join(' ')

  const inputAttrs = { 'type': 'type', 'v-model': 'key' }
  const inputAttrsStr = Object.keys(inputAttrs).map(attr => formatArrt(attr, options[inputAttrs[attr as keyof typeof inputAttrs]])).join(' ')

  return `<el-form-item ${formItemAttrsStr}>
  <el-input ${inputAttrsStr} />
</el-form-item>`
}
