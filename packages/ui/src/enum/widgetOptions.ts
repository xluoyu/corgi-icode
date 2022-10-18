/**
 * 用来配置输入框
 */
export default {
  input: {
    component: 'CgInput',
  },
  inputNumer: {
    component: 'CgInput',
    type: 'number',
  },
  switch: {
    component: 'CgSwitch',
  },
  color: {
    component: 'CgColor',
  },
  alphaColor: {
    component: 'CgColor',
    showAlpha: true,
  },
  labelPosition: {
    component: 'CgSelect',
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
    component: 'CgSelect',
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
    component: 'CgSelect',
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
    component: 'CgSelect',
    options: [
      {
        label: '无',
        value: '',
      },
      {
        label: '手机号',
        value: /^1[3456789]\d{9}$/,
      },
      {
        label: '身份证',
        value: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
      },
      {
        label: '邮箱',
        value: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      },
    ],
    placeholder: '选择预设，或输入正则',
    allowCreate: true,
    defaultFirstOption: true,
    filterable: true,
  },
  resizeSelect: {
    component: 'CgSelect',
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
    component: 'CgSelect',
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
    component: 'CgSelect',
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
  formTypeSelect: {
    component: 'CgSelect',
    options: [
      {
        label: '普通表单',
        value: 'form',
      },
      {
        label: '数据筛选',
        value: 'filter',
      },
    ],
  },
  dateTypeSelect: {
    component: 'CgSelect',
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
  codeEmit: {
    component: 'CgCode',
    name: '模拟数据',
  },
  listOptions: {
    component: 'CgList',
    name: '数据列表',
  },
  naiveButton: {
    component: 'CgSelect',
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
        value: 'error',
      },
      {
        label: '成功',
        value: 'success',
      },
    ],
    naiveSize: {
      component: 'CgSelect',
      options: [
        {
          label: '默认',
          value: 'medium',
        },
        {
          label: '最小',
          value: 'tiny',
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
  },
} as const
