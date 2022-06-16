import type { IFormItemOptions } from './type'

export const FormOptions: IFormItemOptions = [
  {
    label: '表单宽度',
    key: 'style.width',
    type: 'input',
    value: 'auto',
  },
  {
    label: '行内模式',
    key: 'inline',
    type: 'switch',
    value: false,
  },
  {
    label: '标签宽度',
    key: 'label-width',
    type: 'input',
    value: 'auto',
  },
  {
    label: '标签位置',
    key: 'label-position',
    type: 'labelPosition',
    value: 'left',
  },
  {
    label: '组件大小',
    key: 'size',
    type: 'formSize',
    value: 'default',
  },
  {
    label: '开启验证',
    key: 'validate',
    type: 'switch',
    value: false,
  },
]
