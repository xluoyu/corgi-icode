import type { IFormComp, IFormItemOptions } from '../type'
import { CodeTemplate } from '../codeTemplate'
import { formatArrt } from '@/utils/renderTemplate'

export default function(options: IFormItemOptions, widget: IFormComp) {
  const attrs = ['span', 'offset', 'push', 'pull']
  const attrsStr = attrs.map(attr => formatArrt(`:${attr}`, options[attr].value)).filter(Boolean).join(' ')

  const privateVar: Record<string, any> = {}

  const formData = {}

  const children = widget.children
    ? widget.children.map((child) => {
      const { type, form } = child
      if (!CodeTemplate[type])
        return null

      const itemStrData = CodeTemplate[type](form, child)

      Object.assign(privateVar, itemStrData.privateVar || {})
      if (itemStrData.formData) {
        Object.assign(formData, itemStrData.formData)
      }
      return itemStrData.template
    }).filter(Boolean).join('\n')
    : ''

  return {
    template: `<el-col ${attrsStr}>${children}</el-col>`,
    formData,
    privateVar,
  }
}
