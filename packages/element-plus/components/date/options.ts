import type { IWidgetItem } from '@corgi-icode/core'
import CilAvTimer from '~icons/cil/av-timer'

const data: IWidgetItem = {
  title: '日期选择器',
  type: 'date',
  key: '',
  icon: markRaw(CilAvTimer),
  component: 'cg-date',
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
      value: '日期选择',
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
    type: {
      label: '显示类型',
      type: 'dateTypeSelect',
      value: 'date',
    },
    placeholder: {
      label: '占位内容',
      type: 'input',
      value: '请选择时间',
      isShow: (options) => {
        const list = ['year', 'month', 'date', 'dates', 'datetime', 'week']
        return list.includes(options.type)
      },
    },
    startPlaceholder: {
      label: '开始占位内容',
      type: 'input',
      value: '开始时间',
      isShow: (options) => {
        const list = ['datetimerange', 'daterange', 'monthrange']
        return list.includes(options.type)
      },
    },
    endPlaceholder: {
      label: '结束占位内容',
      type: 'input',
      value: '结束时间',
      isShow: (options) => {
        const list = ['datetimerange', 'daterange', 'monthrange']
        return list.includes(options.type)
      },
    },
    rangeSeparator: {
      label: '范围分隔符',
      type: 'input',
      value: '-',
      isShow: (options) => {
        const list = ['datetimerange', 'daterange', 'monthrange']
        return list.includes(options.type)
      },
    },
    format: {
      label: '显示格式',
      type: 'input',
      value: 'YYYY-MM-DD',
    },
    valueFormat: {
      label: '输出格式',
      type: 'input',
      value: 'YYYY-MM-DD',
    },
  },
}

export default data
