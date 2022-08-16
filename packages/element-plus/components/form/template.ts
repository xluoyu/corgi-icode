/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-16 16:36:15
 */
import type { IWidgetItem, renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

export default <renderWidgetCode> function(
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
