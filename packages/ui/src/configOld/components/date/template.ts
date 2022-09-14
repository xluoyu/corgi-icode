import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@/utils/renderTemplate'

const run: renderWidgetCode = (options, widgetItem, formOptions) => {
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
    template: `<el-date-picker ${formOptions ? `v-model="${formOptions.key}.${options._key} "` : ''}${attrsStr} ${otherAttrsStr} />`,
  }
}

export default run
