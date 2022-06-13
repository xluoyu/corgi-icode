import type { IFormComp } from '../type'
import IconoirInputField from '~icons/iconoir/input-field'

const data: IFormComp = {
  title: 'input',
  type: 'input',
  key: '',
  icon: IconoirInputField,
  component: 'cg-input',
  form: [
    {
      label: '绑定key',
      key: '_key',
      type: 'input',
      value: '',
    },
    {
      label: '标签文本',
      key: 'label',
      type: 'input',
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
  ],
}

export default data
