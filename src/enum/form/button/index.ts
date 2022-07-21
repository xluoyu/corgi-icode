import type { IFormComp } from '../type'
import IcOutlineSmartButton from '~icons/ic/outline-smart-button'

const data: IFormComp = {
  title: 'button',
  type: 'button',
  key: '',
  icon: IcOutlineSmartButton,
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
