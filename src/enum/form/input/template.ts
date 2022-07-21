import type { IFormItemOptions } from '../type'
import { formatArrt } from '@/utils/renderTemplate'

export default function(options: IFormItemOptions) {
  const attrs = [
    'type',
    'placeholder',
    'clearable',
    'maxlength',
    'minlength',
    'showWordLimit',
  ]
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr].value))
    .filter(Boolean)
    .join(' ')

  return {
    formData: {
      [options._key.value]: options.value.value,
    },
    template: `<el-input v-model="formData.${options._key.value}" ${attrsStr} />`,
  }
}
