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
      label: '默认值',
      key: 'value',
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
      type: 'iputTypeSelect',
      value: 'text',
    },
    {
      label: '占位内容',
      key: 'placeholder',
      type: 'input',
      value: '请输入内容',
    },
    {
      label: '必填',
      key: 'required',
      type: 'switch',
      value: false,
    },
    {
      label: '校验规则',
      key: 'validate',
      type: 'validateSelect',
      value: '',
    },
  ],
}

export default data
