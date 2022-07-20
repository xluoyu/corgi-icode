import type { IFormComp } from '../type'
import MdiFormatText from '~icons/mdi/format-text'

const data: IFormComp = {
  title: 'text',
  type: 'text',
  key: '',
  icon: MdiFormatText,
  component: 'cg-text',
  noForm: true,
  form: {
    content: {
      label: '内容',
      type: 'input',
      value: '文字',
    },
    size: {
      label: '字体大小',
      type: 'textSizeSelect',
      value: 'large',
    },
    block: {
      label: '块级',
      type: 'switch',
      value: true,
    },
  },
}

export default data
