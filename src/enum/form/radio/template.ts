// import { formatArrt } from '@/utils/renderTemplate'

export default function(options: Record<string, any>) {
  // const attrs = ['placeholder', 'clearable', 'multiple', 'filterable']
  // const attrsStr = attrs.map(attr => formatArrt(attr, options[attr].value)).filter(Boolean).join('\n')
  const privateVar: Record<string, any> = {}
  let optionsStr = ''
  if (options.options.length >= 3) {
    optionsStr = `<el-radio
          v-for="item in ${options._key}SelectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />`
    privateVar[`${options._key}RadioList`] = JSON.stringify(
      options.options,
    )
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
        v-model="formData.${options._key}"
      >
        ${optionsStr}
      </el-radio-group>`,
    privateVar,
  }
}
