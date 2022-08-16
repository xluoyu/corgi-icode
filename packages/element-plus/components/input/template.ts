/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-16 16:17:50
 */
import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

const run: renderWidgetCode = (options, formOptions) => {
  const attrs = [
    'type',
    'placeholder',
    'clearable',
    'maxlength',
    'minlength',
    'showWordLimit',
  ]
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join(' ')

  return {
    formData: {
      [options._key]: options.value,
    },
    template: `<el-input ${formOptions ? `v-model="${formOptions.key}.${options._key} "` : ''}${attrsStr} />`,
  }
}

export default run
