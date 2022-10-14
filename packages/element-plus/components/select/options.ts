import type { IWidgetItem } from '@corgi-icode/core'
import OcticonMultiSelect16 from '~icons/octicon/multi-select-16'

const data: IWidgetItem = {
  title: '下拉框',
  type: 'select',
  key: '',
  icon: markRaw(OcticonMultiSelect16),
  component: 'cg-select',
  form: {
    _key: {
      label: '绑定key',
      type: 'input',
      value: '',
    },
    value: {
      label: '默认值',
      type: 'input',
      value: '',
    },
    label: {
      label: '标签文本',
      type: 'input',
      value: '选择框',
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
    placeholder: {
      label: '占位内容',
      type: 'input',
      value: '请输入内容',
    },
    clearable: {
      label: '可清空',
      type: 'switch',
      value: false,
    },
    required: {
      label: '必填',
      type: 'switch',
      value: false,
    },
    multiple: {
      label: '多选',
      type: 'switch',
      value: false,
    },
    filterable: {
      label: '可搜索',
      type: 'switch',
      value: false,
    },
  },
}

export default data
