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
    label: '标签文本',
    key: 'label',
    type: 'text',
    value: '输入框',
  },
]
