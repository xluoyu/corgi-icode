import type { IWidgetItem } from '@corgi-icode/core'
import RiBankCardLine from '~icons/ri/bank-card-line'

const data: IWidgetItem = {
  title: '卡片',
  type: 'card',
  key: '',
  icon: RiBankCardLine,
  component: 'cg-card',
  noForm: true,
  children: [],
  form: {
    title: {
      label: '标题',
      type: 'input',
      value: '标题',
    },
    collapse: {
      label: '折叠',
      type: 'switch',
      value: false,
    },
    background: {
      label: '背景色',
      type: 'alphaColor',
      value: '',
    },
  },
}

export default data
