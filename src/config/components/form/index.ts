/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-11 10:44:15
 */
import type { IWidgetItem } from '@/core'
import IconParkOutlineFormOne from '~icons/icon-park-outline/form-one'

const data: IWidgetItem = {
  title: '表单',
  type: 'form',
  key: '',
  icon: IconParkOutlineFormOne,
  component: 'cg-form',
  noForm: true,
  children: [],
  form: {
    'dataName': {
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
      value: 'auto',
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
    'validate': {
      label: '开启验证',
      type: 'switch',
      value: false,
    },
  },
}

export default data
