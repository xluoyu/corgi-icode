import type { IWidgetItem } from '@corgi-icode/core'
import CilAvTimer from '~icons/cil/av-timer'

const data: IWidgetItem = {
  title: '时间选择器',
  type: 'time',
  key: '',
  icon: CilAvTimer,
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
      value: '时间选择',
    },
    required: {
      label: '必填',
      type: 'switch',
      value: false,
    },
    editable: {
      label: '可输入',
      type: 'switch',
      value: true,
    },
    clearable: {
      label: '可清空',
      type: 'switch',
      value: true,
    },
    isRange: {
      label: '是否范围选择',
      type: 'switch',
      value: false,
    },
    placeholder: {
      label: '占位内容',
      type: 'input',
      value: '请选择时间',
      isShow: options => !options.isRange,
    },
    startPlaceholder: {
      label: '开始占位内容',
      type: 'input',
      value: '开始时间',
      isShow: options => options.isRange,
    },
    endPlaceholder: {
      label: '结束占位内容',
      type: 'input',
      value: '结束时间',
      isShow: options => options.isRange,
    },
    rangeSeparator: {
      label: '范围分隔符',
      type: 'input',
      value: '-',
      isShow: options => options.isRange,
    },
    format: {
      label: '时间格式',
      type: 'input',
      value: 'HH:mm:ss',
    },
  },
}

export default data
