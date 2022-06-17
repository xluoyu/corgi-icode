import type { IFormComp } from '../type'
import OcticonMultiSelect16 from '~icons/octicon/multi-select-16'

const data: IFormComp = {
  title: 'select',
  type: 'select',
  key: '',
  icon: OcticonMultiSelect16,
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
      type: 'selectOptions',
      value: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 },
      ],
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
