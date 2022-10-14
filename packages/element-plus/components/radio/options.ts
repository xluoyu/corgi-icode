import type { IWidgetItem } from '@corgi-icode/core'
import IcOutlineRadioButtonChecked from '~icons/ic/outline-radio-button-checked'

const data: IWidgetItem = {
  title: '单选',
  type: 'radio',
  key: '',
  icon: markRaw(IcOutlineRadioButtonChecked),
  component: 'cg-radio',
  form: {
    _key: {
      label: '绑定key',
      type: 'input',
      value: '',
    },
    value: {
      label: '默认值',
      type: 'input',
      value: '1',
    },
    label: {
      label: '标签文本',
      type: 'input',
      value: '单选',
    },
    options: {
      label: '选项配置',
      type: 'listOptions',
      value: {
        选项一: 1,
        选项二: 2,
        选项三: 3,
      },
    },
    required: {
      label: '必填',
      type: 'switch',
      value: false,
    },
  },
}

export default data
