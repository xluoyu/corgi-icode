import type { IWidgetItem } from '@corgi-icode/core'
import RadixIconsDividerHorizontal from '~icons/radix-icons/divider-horizontal'

const data: IWidgetItem = {
  title: '分割线',
  type: 'divider',
  key: '',
  icon: markRaw(RadixIconsDividerHorizontal),
  noForm: true,
  form: {
    // color: {
    //   label: '颜色',
    //   type: 'color',
    //   value: '#dcdfe6',
    // },
    content: {
      label: '分割线文案',
      type: 'input',
      value: '',
    },
    // contentPosition: {
    //   label: '分隔线位置',
    //   type: 'input',
    //   value: '关闭',
    // }
  },
}

export default data
