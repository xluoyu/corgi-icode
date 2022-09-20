/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-12 16:41:43
 */
import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

const run: renderWidgetCode = (options, _formDataName) => {
  const attrs = ['placeholder', 'clearable', 'multiple', 'filterable']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join('\n')
  const privateVar: Record<string, any> = {}
  let optionsStr = ''
  if (options.options.length >= 3) {
    optionsStr = `<el-option
          v-for="item in ${options._key}SelectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />`
    privateVar[`${options._key}SelectList`] = options.options
  } else {
    optionsStr = options.options.reduce(
      (pre: string, cur: { value: any; label: any }) => {
        return `${pre}<el-option :value="${cur.value}" label="${cur.label}"/>`
      },
      '',
    )
  }

  return {
    formData: {
      [options._key]: options.value,
    },
    template: `<el-form-item label="${options.label}" prop="${options._key}">
    <el-select ${_formDataName ? `v-model="${_formDataName}.${options._key} "` : ''}${attrsStr}>
        ${optionsStr}
      </el-select>
    </el-form-item>`,
    privateVar,
  }
}

export default run
