import type { IWidgetItem } from '@corgi-icode/core'
import IcOutlineSmartButton from '~icons/ic/outline-smart-button'

const data: IWidgetItem = {
  title: '按钮',
  type: 'button',
  key: '',
  icon: markRaw(IcOutlineSmartButton),
  component: 'cg-button',
  noForm: true,
  form: {
    type: {
      label: '按钮类型',
      type: 'buttonType',
      value: 'default',
    },
    content: {
      label: '内容',
      type: 'input',
      value: '按钮',
    },
    size: {
      label: '尺寸',
      type: 'formSize',
      value: 'default',
    },
    inline: {
      label: '内联',
      type: 'switch',
      value: true,
    },
  },
}

export default data
