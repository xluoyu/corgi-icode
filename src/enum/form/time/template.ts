import type { IFormItemOptions } from '../type'
import { formatArrt } from '@/utils/renderTemplate'

export default function(options: IFormItemOptions) {
  const attrs = ['editable', 'clearable', 'isRange', 'format']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr].value))
    .filter(Boolean)
    .join(' ')
  let otherAttrsStr = ''
  if (options.isRange.value) {
    const rangeAttrs = ['startPlaceholder', 'endPlaceholder', 'rangeSeparator']
    otherAttrsStr = rangeAttrs
      .map(attr => formatArrt(attr, options[attr].value))
      .filter(Boolean)
      .join(' ')
  } else {
    const disRangeAttrs = ['placeholder']
    otherAttrsStr = disRangeAttrs
      .map(attr => formatArrt(attr, options[attr].value))
      .filter(Boolean)
      .join(' ')
  }

  return {
    formData: {
      [options._key.value]: options.value.value,
    },
    template: `<el-time-picker v-model="formData.${options._key.value}" ${attrsStr} ${otherAttrsStr} />`,
  }
}
