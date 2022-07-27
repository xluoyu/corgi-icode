import { formatArrt } from '@/utils/renderTemplate'

export default function(options: Record<string, any>) {
  const attrs = [
    'type',
    'placeholder',
    'clearable',
    'maxlength',
    'minlength',
    'showWordLimit',
  ]
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join(' ')

  return {
    formData: {
      [options._key]: options.value,
    },
    template: `<el-input v-model="formData.${options._key}" ${attrsStr} />`,
  }
}
