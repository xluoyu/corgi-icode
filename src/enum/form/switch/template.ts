import { formatArrt } from '@/utils/renderTemplate'

export default function(options: any) {
  const attrs = ['activeText', 'inactiveText', 'activeColor', 'inactiveColor']
  const attrsStr = attrs.map(attr => formatArrt(attr, options[attr].value)).filter(Boolean).join('\n')

  return {
    formData: {
      [options._key.value]: options.value.value,
    },
    template: `<el-switch
        v-model="formData.${options._key.value}"
        ${attrsStr}
      />`,
  }
}
