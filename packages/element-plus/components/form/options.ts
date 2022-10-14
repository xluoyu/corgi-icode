/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-24 21:00:24
 */
import type { IWidgetItem } from '@corgi-icode/core'
import IconParkOutlineFormOne from '~icons/icon-park-outline/form-one'

export default <IWidgetItem> {
  title: '表单',
  type: 'form',
  key: '',
  icon: markRaw(IconParkOutlineFormOne),
  noForm: true,
  children: [],
  form: {
    '_key': {
      label: '数据对象',
      type: 'input',
      value: '',
    },
    'style.width': {
      label: '表单宽度',
      type: 'input',
      value: '',
    },
    'inline': {
      label: '行内模式',
      type: 'switch',
      value: false,
    },
    'label-width': {
      label: '标签宽度',
      type: 'input',
      value: '',
    },
    'label-position': {
      label: '标签位置',
      type: 'labelPosition',
      value: 'left',
    },
    'size': {
      label: '组件大小',
      type: 'formSize',
      value: 'default',
    },
    'formType': {
      label: '表单类型',
      type: 'formTypeSelect',
      value: 'form',
    },
  },
}
