export default {
  title: 'Input',
  type: 'input',
  form: [
    {
      label: '标签文本',
      key: 'label',
      type: 'text',
      default: '输入框',
    },
    {
      label: '输入框类型',
      key: 'type',
      type: 'select',
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
    {
      label: 'key值',
      key: 'key',
      type: 'text',
    },
  ],
}
