/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-24 21:10:44
 */
import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

const run: renderWidgetCode = (options, _formDataName) => {
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
    template: `<n-form-item label="${options.label}" prop="${options._key}">
    <n-input ${_formDataName ? `v-model="${_formDataName}.${options._key} "` : ''}${attrsStr} />
    </n-form-item>
    `,
  }
}

export default run
