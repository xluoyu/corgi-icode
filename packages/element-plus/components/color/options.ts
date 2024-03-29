import type { IWidgetItem } from '@corgi-icode/core'
import IonColorPalette from '~icons/ion/color-palette'

const data: IWidgetItem = {
  title: '取色器',
  type: 'color',
  key: '',
  icon: markRaw(IonColorPalette),
  component: 'cg-color',
  form: {
    _key: {
      label: '绑定key',
      type: 'input',
      value: '',
    },
    value: {
      label: '默认值',
      type: 'color',
      value: '#409EFF',
    },
    label: {
      label: '标签文本',
      type: 'input',
      value: '颜色',
    },
    showAlpha: {
      label: '支持透明度',
      type: 'switch',
      value: false,
    },
  },
}

export default data
