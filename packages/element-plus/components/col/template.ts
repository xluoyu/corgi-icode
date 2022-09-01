import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

export default <renderWidgetCode> function(
  formOptions: Record<string, any>,
) {
  const attrs = ['span', 'offset', 'push', 'pull']
  const attrsStr = attrs
    .map(attr => formatArrt(`:${attr}`, formOptions[attr]))
    .filter(Boolean)
    .join(' ')

  return {
    template: (children: string) => `<el-col ${attrsStr}>${children}</el-col>`,
  }
}
