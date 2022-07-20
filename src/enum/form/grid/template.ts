import type { IFormComp, IFormItemOptions } from '../type'
import { CodeTemplate } from '../codeTemplate'
import { formatArrt } from '@/utils/renderTemplate'

export default function(
  formOptions: IFormItemOptions,
  widget: IFormComp,
  options: any,
) {
  const attrs = ['gutter']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, formOptions[attr].value))
    .filter(Boolean)
    .join(' ')

  const privateVar: Record<string, any> = {}
  const formData = {}

  const children = widget.children
    ? widget.children
      .map((child) => {
        const { type, form } = child
        if (!CodeTemplate[type])
          return null

        const itemStrData = CodeTemplate[type](form, child, options)

        Object.assign(privateVar, itemStrData.privateVar || {})
        if (itemStrData.formData) {
          Object.assign(formData, itemStrData.formData)
        }
        return itemStrData.template
      })
      .filter(Boolean)
      .join('\n')
    : ''

  return {
    template: `<el-row ${attrsStr}>${children}</el-row>`,
    formData,
    privateVar,
  }
}
