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
          label: '电话',
          value: 'tel',
        },
      ],
    },
    {
      label: '是否必填',
      key: 'required',
      type: 'switch',
      value: false,
    },
    {
      label: '校验规则',
      key: 'validate',
      type: 'select',
      value: '',
      placeholder: '选择预设，或输入正则',
      tooltip: '请确保在表单配置中开启校验',
      options: [
        {
          label: '无',
          value: '',
        },
        {
          label: '手机号',
          value: 'phone',
        },
        {
          label: '邮箱',
          value: 'email',
        },
        {
          label: '身份证',
          value: 'idcard',
        },
      ],
    },
  ],
}

export default data
