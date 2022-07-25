import type { IFormComp } from '../type'
import MdiToggleSwitchOff from '~icons/mdi/toggle-switch-off'

const data: IFormComp = {
  title: '开关',
  type: 'switch',
  key: '',
  icon: MdiToggleSwitchOff,
  component: 'cg-switch',
  form: {
    _key: {
      label: '绑定key',
      type: 'input',
      value: '',
    },
    value: {
      label: '默认值',
      type: 'switch',
      value: true,
    },
    label: {
      label: '标签文本',
      type: 'input',
      value: '开关',
    },
    activeText: {
      label: '开启文本',
      type: 'input',
      value: '开启',
    },
    inactiveText: {
      label: '关闭文本',
      type: 'input',
      value: '关闭',
    },
    activeColor: {
      label: '开启颜色',
      type: 'color',
      value: '#409EFF',
    },
    inactiveColor: {
      label: '关闭颜色',
      type: 'color',
      value: '#C0C4CC',
    },
  },
}

export default data
