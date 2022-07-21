import type { IFormItemOptions } from '../type'
import { formatArrt } from '@/utils/renderTemplate'

export default function(options: IFormItemOptions) {
  const attrs = ['type', 'size']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr].value))
    .filter(Boolean)
    .join(' ')

  return {
    template: `<el-button ${attrsStr}${
      !options.inline.value ? ' style="display: flex"' : ''
    }>${options.content.value}</el-button>`,
  }
}
