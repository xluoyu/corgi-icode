import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

export default <renderWidgetCode> function(options: Record<string, any>) {
  const attrs = ['type', 'size']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join(' ')

  return {
    template: `<el-button ${attrsStr}${
      !options.inline ? ' style="display: flex"' : ''
    }>${options.content}</el-button>`,
  }
}
