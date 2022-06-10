export default {
  title: 'select',
  type: 'select',
  component: () => import('./select.vue'),
  form: [
    {
      label: '标签文本',
      key: 'label',
      type: 'text',
      default: '选择框',
    },
  ],
}
