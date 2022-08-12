import type { IWidgetItem } from '@/core'

const data: IWidgetItem = {
  title: 'col',
  type: 'col',
  key: '',
  component: 'cg-col',
  noForm: true,
  form: {
    span: {
      label: '占位格数',
      type: 'inputNumer',
      value: 12,
    },
    offset: {
      label: '左侧间隔',
      type: 'inputNumer',
      value: 0,
    },
    push: {
      label: '向右移动',
      type: 'inputNumer',
      value: 0,
    },
    pull: {
      label: '向左移动',
      type: 'inputNumer',
      value: 0,
    },
  },
  children: [],
}

export default data
