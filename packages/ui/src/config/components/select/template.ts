/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-12 16:41:43
 */
import type { renderWidgetCode } from '@/core'
import { formatArrt } from '@/utils/renderTemplate'

const run: renderWidgetCode = (options, widgetItem, formOptions) => {
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
    template: `<el-select ${formOptions ? `v-model="${formOptions.key}.${options._key} "` : ''}${attrsStr}>
        ${optionsStr}
      </el-select>`,
    privateVar,
  }
}

export default run
