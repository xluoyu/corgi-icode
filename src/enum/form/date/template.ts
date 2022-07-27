import { formatArrt } from '@/utils/renderTemplate'

export default function(options: Record<string, any>) {
  const attrs = ['editable', 'clearable', 'type', 'format', 'valueFormat']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join(' ')
  let otherAttrsStr = ''
  const rangeTypeList = ['datetimerange', 'daterange', 'monthrange']
  if (rangeTypeList.includes(options.type)) {
    const rangeAttrs = ['startPlaceholder', 'endPlaceholder', 'rangeSeparator']
    otherAttrsStr = rangeAttrs
      .map(attr => formatArrt(attr, options[attr]))
      .filter(Boolean)
      .join(' ')
  } else {
    const disRangeAttrs = ['placeholder']
    otherAttrsStr = disRangeAttrs
      .map(attr => formatArrt(attr, options[attr]))
      .filter(Boolean)
      .join(' ')
  }

  return {
    formData: {
      [options._key]: rangeTypeList.includes(options.type)
        ? options.value.split(',')
        : options.value,
    },
    template: `<el-date-picker v-model="formData.${options._key}" ${attrsStr} ${otherAttrsStr} />`,
  }
}
