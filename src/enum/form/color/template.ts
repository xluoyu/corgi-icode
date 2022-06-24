import type { IFormItemOptions } from '../type'
import { formatArrt } from '@/utils/renderTemplate'

export default function(options: IFormItemOptions) {
  const attrs = ['showAlpha']
  const attrsStr = attrs.map(attr => formatArrt(attr, options[attr].value)).filter(Boolean).join(' ')

  return {
    template: `<el-color-picker v-model="formData.${options._key.value}" ${attrsStr} />`,
  }
}
