import { formatArrt } from '@/utils/renderTemplate'

export default function(options: any) {
  const formItemAttrs = ['label', 'prop']
  const formItemAttrsStr = formItemAttrs.map(attr => formatArrt(attr, options[attr])).join(' ')

  const inputAttrs = { 'type': 'type', 'v-model': 'key' }
  const inputAttrsStr = Object.keys(inputAttrs).map(attr => formatArrt(attr, options[inputAttrs[attr as keyof typeof inputAttrs]])).join(' ')

  return {
    template: `<el-select
  v-model="value"
  v-bind="$attrs"
>
  <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  />
</el-select>`
  }
}
