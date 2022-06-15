/**
 * 用来配置输入框
 */
export default {
  input: {
    comp: 'input',
  },
  switch: {
    comp: 'switch',
  },
  labelPosition: {
    comp: 'select',
    options: [
      {
        label: '左',
        value: 'left',
      },
      {
        label: '右',
        value: 'right',
      },
      {
        label: '上',
        value: 'top',
      },
    ],
  },
  formSize: {
    comp: 'select',
    options: [
      {
        label: '默认',
        value: 'default',
      },
      {
        label: '小',
        value: 'small',
      },
      {
        label: '大',
        value: 'large',
      },
    ],
  },
  iputTypeSelect: {
    comp: 'select',
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
        label: '数字',
        value: 'number',
      },
    ],
  },
  validateSelect: {
    comp: 'select',
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
        label: '身份证',
        value: 'idCard',
      },
      {
        label: '邮箱',
        value: 'email',
      },
    ],
    placeholder: '选择预设，或输入正则',
    tooltip: '请确保在表单配置中开启校验',
  },
  selectOptions: {
    comp: 'options',
  },
}