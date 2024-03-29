import type { IWidgetItem } from '@corgi-icode/core'
import BiTextareaResize from '~icons/bi/textarea-resize'

const data: IWidgetItem = {
  title: '多行文本',
  type: 'textarea',
  key: '',
  icon: markRaw(BiTextareaResize),
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
      value: '多行文本',
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
    maxlength: {
      label: '最大长度',
      type: 'input',
      value: '',
    },
    minlength: {
      label: '最小长度',
      type: 'input',
      value: '',
    },
    showWordLimit: {
      label: '显示字数限制',
      type: 'switch',
      value: false,
    },
    rows: {
      label: '行数',
      type: 'input',
      value: '3',
    },
    autosize: {
      label: '自动调整大小',
      type: 'switch',
      value: false,
    },
    resize: {
      label: '用户控制缩放',
      type: 'resizeSelect',
      value: 'both',
    },
  },
}

export default data
