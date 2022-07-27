import { formatArrt } from '@/utils/renderTemplate'

export default function(options: Record<string, any>) {
  const attrs = ['editable', 'clearable', 'isRange', 'format']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join(' ')
  let otherAttrsStr = ''
  if (options.isRange) {
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
      [options._key]: options.value,
    },
    template: `<el-time-picker v-model="formData.${options._key}" ${attrsStr} ${otherAttrsStr} />`,
  }
}
