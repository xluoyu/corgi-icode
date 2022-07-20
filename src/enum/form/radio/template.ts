// import { formatArrt } from '@/utils/renderTemplate'

export default function(options: any) {
  // const attrs = ['placeholder', 'clearable', 'multiple', 'filterable']
  // const attrsStr = attrs.map(attr => formatArrt(attr, options[attr].value)).filter(Boolean).join('\n')
  const privateVar: Record<string, any> = {}
  let optionsStr = ''
  if (options.options.value.length >= 3) {
    optionsStr = `<el-radio
          v-for="item in ${options._key.value}SelectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />`
    privateVar[`${options._key.value}RadioList`] = JSON.stringify(
      options.options.value,
    )
  } else {
    optionsStr = options.options.value.reduce(
      (pre: string, cur: { value: any; label: any }) => {
        return `${pre}<el-radio :value="${cur.value}" label="${cur.label}"/>`
      },
      '',
    )
  }

  return {
    formData: {
      [options._key.value]: options.value.value,
    },
    template: `<el-radio-group
        v-model="formData.${options._key.value}"
      >
        ${optionsStr}
      </el-radio-group>`,
    privateVar,
  }
}
