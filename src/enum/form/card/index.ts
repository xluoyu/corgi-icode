import type { IFormComp } from '../type'
import RiBankCardLine from '~icons/ri/bank-card-line'

const data: IFormComp = {
  title: 'card',
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
