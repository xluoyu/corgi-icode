import type { renderWidgetCode } from '@corgi-icode/core'

const run: renderWidgetCode = (options, widgetItem, formOptions) => {
  const privateVar: Record<string, any> = {}
  let optionsStr = ''
  if (options.options.length >= 3) {
    optionsStr = `<el-radio
          v-for="item in ${options._key}SelectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />`
    privateVar[`${options._key}RadioList`] = options.options
  } else {
    optionsStr = options.options.reduce(
      (pre: string, cur: { value: any; label: any }) => {
        return `${pre}<el-radio :value="${cur.value}" label="${cur.label}"/>`
      },
      '',
    )
  }

  return {
    formData: {
      [options._key]: options.value,
    },
    template: `<el-radio-group
        ${formOptions ? `v-model="${formOptions.key}.${options._key} "` : ''}
      >
        ${optionsStr}
      </el-radio-group>`,
    privateVar,
  }
}

export default run
