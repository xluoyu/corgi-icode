import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

const run: renderWidgetCode = (options, _formDataName) => {
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
    template: `<el-form-item label="${options.label}" prop="${options._key}">
    <el-date-picker ${_formDataName ? `v-model="${_formDataName}.${options._key} "` : ''}${attrsStr} ${otherAttrsStr} />
    </el-form-item>`,
  }
}

export default run
