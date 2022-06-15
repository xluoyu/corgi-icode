import OcticonMultiSelect16 from '~icons/octicon/multi-select-16'

export default {
  title: 'select',
  type: 'select',
  key: '',
  icon: OcticonMultiSelect16,
  component: 'cg-select',
  form: [
    {
      label: '标签文本',
      key: 'label',
      type: 'input',
      value: '选择框',
    },
    {
      label: '选项',
      key: 'options',
      type: 'selectOptions',
      value: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 },
      ],
    },
  ],
}
