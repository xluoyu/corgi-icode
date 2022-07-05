import type { IFormComp } from '../type'
import CilAvTimer from '~icons/cil/av-timer'

const data: IFormComp = {
  title: 'timeAndDate',
  type: 'timeAndDate',
  key: '',
  icon: CilAvTimer,
  component: 'cg-text',
  noForm: true,
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
      label: '开始时间占位内容',
      type: 'input',
      value: '开始时间',
      isShow: options => options.isRange,
    },
    endPlaceholder: {
      label: '结束时间占位内容',
      type: 'input',
      value: '结束时间',
      isShow: options => options.isRange,
    },
  },
}

export default data
