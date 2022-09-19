import type { IWidgetItem } from '@corgi-icode/core'
import IonCheckbox from '~icons/ion/checkbox'

const data: IWidgetItem = {
  title: '多选',
  type: 'checkbox',
  key: '',
  icon: markRaw(IonCheckbox),
  component: 'cg-checkbox',
  form: {
    _key: {
      label: '绑定key',
      type: 'input',
      value: '',
    },
    value: {
      label: '默认值',
      type: 'input',
      value: '1, 2',
    },
    label: {
      label: '标签文本',
      type: 'input',
      value: '单选',
    },
    options: {
      label: '选项配置',
      type: 'selectOptions',
      value: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' },
      ],
    },
  },
}

export default data