import type { IWidgetItem } from '@corgi-icode/core'
import MdiFormatText from '~icons/mdi/format-text'

const data: IWidgetItem = {
  title: '文字',
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
