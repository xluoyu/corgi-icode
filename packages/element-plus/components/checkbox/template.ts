// import { formatArrt } from '@/utils/renderTemplate'
import type { renderWidgetCode } from '@corgi-icode/core'

const run: renderWidgetCode = (options, _formDataName) => {
  const privateVar: Record<string, any> = {}
  let optionsStr = ''

  const cOptions = Object.assign({}, options.options)

  options.options = Object.keys(cOptions).map((key) => {
    return {
      label: key,
      value: cOptions[key],
    }
  })

  if (options.options.length >= 3) {
    optionsStr = `<el-checkbox
          v-for="item in ${options._key}SelectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />`
    privateVar[`${options._key}CheckboxList`] = options.options
  } else {
    optionsStr = options.options.reduce(
      (pre: string, cur: { value: any; label: any }) => {
        return `${pre}<el-checkbox :value="${cur.value}" label="${cur.label}"/>`
      },
      '',
    )
  }

  return {
    formData: {
      [options._key]: options.value.split(','),
    },
    template: `<el-form-item label="${options.label}" prop="${options._key}">
    <el-checkbox-group
    ${_formDataName ? `v-model="${_formDataName}.${options._key} "` : ''}
      >
        ${optionsStr}
      </el-checkbox-group>
    </el-form-item>`,
    privateVar,
  }
}

export default run
