import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

export default <renderWidgetCode> function(options: Record<string, any>, _formDataName) {
  const attrs = [
    'placeholder',
    'clearable',
    'maxlength',
    'minlength',
    'showWordLimit',
    'rows',
    'autosize',
    'resize',
  ]
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join(' ')

  return {
    formData: {
      [options._key]: options.value,
    },
    template: `<el-form-item label="${options.label}" prop="${options._key}">
    <el-input v-model="${_formDataName}.${options._key}" type="textarea" ${attrsStr} />
    </el-form-item>`,
  }
}
