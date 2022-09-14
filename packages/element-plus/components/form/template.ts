/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-24 21:00:28
 */
import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

export default <renderWidgetCode> function(
  option,
  _formDataName,
) {
  const attrs = ['inline', 'label-width', 'label-position', 'size']
  const attrsStr = attrs
    .map(attr => formatArrt(`${attr}`, option[attr]))
    .filter(Boolean)
    .join(' ')

  const formDataName = option._key || _formDataName

  return {
    template: (children: string) => `<el-form :model="${formDataName}" ${attrsStr} :rules='${formDataName}Rules'>${children}</el-form>`,
    formData: {
      [formDataName]: {},
    },
    formDataName,
  }
}
