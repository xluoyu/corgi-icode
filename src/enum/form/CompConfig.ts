/**
 * 用来配置输入框
 */
export default {
  input: {
    comp: 'input',
  },
  inputNumer: {
    comp: 'input',
    type: 'number',
  },
  switch: {
    comp: 'switch',
  },
  color: {
    comp: 'color',
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
  inputTypeSelect: {
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
    allowCreate: true,
    defaultFirstOption: true,
    filterable: true,
  },
  selectOptions: {
    comp: 'options',
  },
  resizeSelect: {
    comp: 'select',
    options: [
      {
        label: '不可改变',
        value: 'none',
      },
      {
        label: '可改变',
        value: 'both',
      },
      {
        label: '只能改变宽度',
        value: 'horizontal',
      },
      {
        label: '只能改变高度',
        value: 'vertical',
      },
    ],
  },
  textSizeSelect: {
    comp: 'select',
    options: [
      {
        label: 'Supplementary text',
        value: 'extra-small',
      },
      {
        label: 'Body (small)',
        value: 'small',
      },
      {
        label: 'Body',
        value: 'base',
      },
      {
        label: 'Small Title',
        value: 'medium',
      },
      {
        label: 'Title',
        value: 'large',
      },
      {
        label: 'Main Title',
        value: 'extra-large',
      },
    ],
  },
  buttonType: {
    comp: 'select',
    options: [
      {
        label: '默认',
        value: 'default',
      },
      {
        label: '确认',
        value: 'primary',
      },
      {
        label: '取消',
        value: 'info',
      },
      {
        label: '警告',
        value: 'warning',
      },
      {
        label: '危险',
        value: 'danger',
      },
      {
        label: '成功',
        value: 'success',
      },
    ],
  },
  dateTypeSelect: {
    comp: 'select',
    options: [
      {
        label: '年',
        value: 'year',
      },
      {
        label: '月',
        value: 'month',
      },
      {
        label: '日',
        value: 'date',
      },
      {
        label: '多个日期',
        value: 'dates',
      },
      {
        label: '日期时间',
        value: 'datetime',
      },
      {
        label: '周',
        value: 'week',
      },
      {
        label: '日期时间范围',
        value: 'datetimerange',
      },
      {
        label: '日期范围',
        value: 'daterange',
      },
      {
        label: '月份范围',
        value: 'monthrange',
      },
    ],
  },
}
