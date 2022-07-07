import type { IFormItemOptions } from '../type'
import { formatArrt } from '@/utils/renderTemplate'

export default function(options: IFormItemOptions) {
  const attrs = ['editable', 'clearable', 'type', 'format', 'valueFormat']
  const attrsStr = attrs.map(attr => formatArrt(attr, options[attr].value)).filter(Boolean).join(' ')
  let otherAttrsStr = ''
  const rangeTypeList = ['datetimerange', 'daterange', 'monthrange']
  if (rangeTypeList.includes(options.type.value)) {
    const rangeAttrs = ['startPlaceholder', 'endPlaceholder', 'rangeSeparator']
    otherAttrsStr = rangeAttrs.map(attr => formatArrt(attr, options[attr].value)).filter(Boolean).join(' ')
  } else {
    const disRangeAttrs = ['placeholder']
    otherAttrsStr = disRangeAttrs.map(attr => formatArrt(attr, options[attr].value)).filter(Boolean).join(' ')
  }

  return {
    formData: {
      [options._key.value]: rangeTypeList.includes(options.type.value) ? options.value.value.split(',') : options.value.value,
    },
    template: `<el-date-picker v-model="formData.${options._key.value}" ${attrsStr} ${otherAttrsStr} />`,
  }
}
