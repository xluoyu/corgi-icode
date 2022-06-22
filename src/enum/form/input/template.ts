import type { IFormItemOptions } from '../type'
import { formatArrt } from '@/utils/renderTemplate'

export default function(options: IFormItemOptions) {
  const attrs = ['type', 'placeholder', 'clearable', 'maxlength', 'minlength', 'showWordLimit']
  const attrsStr = attrs.map(attr => formatArrt(attr, options[attr].value)).join(' ')

  return {
    template: `<el-input v-model="formData.${options._key.value}" ${attrsStr} />`,
  }
}
