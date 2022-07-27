import { formatArrt } from '@/utils/renderTemplate'

export default function(options: Record<string, any>) {
  const attrs = ['activeText', 'inactiveText', 'activeColor', 'inactiveColor']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join('\n')

  return {
    formData: {
      [options._key]: options.value,
    },
    template: `<el-switch
        v-model="formData.${options._key}"
        ${attrsStr}
      />`,
  }
}
