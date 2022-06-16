import OcticonMultiSelect16 from '~icons/octicon/multi-select-16'

export default {
  title: 'select',
  type: 'select',
  key: '',
  icon: OcticonMultiSelect16,
  component: 'cg-select',
  form: {
    _key: {
      label: '绑定key',
      type: 'input',
      value: '选择框',
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
  },
}
