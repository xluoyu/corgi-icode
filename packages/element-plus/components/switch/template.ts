import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

const run: renderWidgetCode = (options, _formDataName) => {
  const attrs = ['activeText', 'inactiveText', 'activeColor', 'inactiveColor']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join('\n')

  return {
    formData: {
      [options._key]: options.value,
    },
    template: `<el-form-item label="${options.label}" prop="${options._key}">
    <el-switch
        ${_formDataName ? `v-model="${_formDataName}.${options._key} "` : ''}
        ${attrsStr}
      />
    </el-form-item>`,
  }
}

export default run
