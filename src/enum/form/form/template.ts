import type { IWidgetItem } from '@/core'
import { formatArrt } from '@/utils/renderTemplate'

export default function(
  formOptions: Record<string, any>,
  widget: IWidgetItem,
) {
  const attrs = ['inline', 'label-width', 'label-position', 'size']
  const attrsStr = attrs
    .map(attr => formatArrt(`${attr}`, formOptions[attr]))
    .filter(Boolean)
    .join(' ')

  const formDataName = formOptions.dataName || widget.key

  return {
    template: (children: string) => `<el-form :model="${formDataName}" ${attrsStr}${
      formOptions.validate ? ` :rules='${formDataName}Rules'` : ''
    }>${children}</el-form>`,
    formData: {
      [formDataName]: {},
    },
    formDataName,
  }
}
