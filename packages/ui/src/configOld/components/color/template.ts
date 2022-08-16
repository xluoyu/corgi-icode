import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@/utils/renderTemplate'

const run: renderWidgetCode = (options, widgetItem, formOptions) => {
  const attrs = ['showAlpha']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join(' ')

  return {
    formData: {
      [options._key]: options.value,
    },
    template: `<el-color-picker ${formOptions ? `v-model="${formOptions.key}.${options._key} "` : ''} ${attrsStr} />`,
  }
}

export default run
