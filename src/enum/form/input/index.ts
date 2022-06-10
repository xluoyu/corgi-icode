import type { IFormComp } from '../type'
import Input from './input.vue'

const data: IFormComp = {
  title: 'input',
  type: 'input',
  component: markRaw(Input),
  form: [
    {
      label: '标签文本',
      key: 'label',
      type: 'text',
      value: '输入框',
    },
    {
      label: '输入框类型',
      key: 'type',
      type: 'select',
      value: 'text',
      options: [
        {
          label: '文本',
          value: 'text',
        },
        {
          label: '密码',
          value: 'password',
        },
        {
          label: '文本域',
          value: 'textarea',
        },
        {
          label: '邮箱',
          value: 'email',
        },
        {
          label: '电话',
          value: 'tel',
        },
        {
          label: '链接',
          value: 'url',
        },
      ],
    },
    {
      label: 'key值',
      key: '_key',
      type: 'text',
      value: '',
    },
  ],
}

export default data
