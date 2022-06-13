import Input from './input'
import Select from './select'
// import Textarea from './textarea'
import type { IFormList } from './type'

export const data: IFormList = [
  {
    title: 'basic',
    children: [
      Input,
      Select,
    ],
  },
]

export const formData = [
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
    type: 'select',
    value: 'left',
    options: [
      {
        label: '左',
        value: 'left',
      },
      {
        label: '右',
        value: 'right',
      },
      {
        label: '上',
        value: 'top',
      },
    ],
  },
  {
    label: '组件大小',
    key: 'size',
    type: 'select',
    value: 'default',
    options: [
      {
        label: '默认',
        value: 'default',
      },
      {
        label: '小',
        value: 'small',
      },
      {
        label: '大',
        value: 'large',
      },
    ],
  },
  {
    label: '开启验证',
    key: 'validate',
    type: 'switch',
    value: false,
  },
]
