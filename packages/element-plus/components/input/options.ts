/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-17 17:40:37
 */
import type { IWidgetItem } from '@corgi-icode/core'
import IconoirInputField from '~icons/iconoir/input-field'

export default <IWidgetItem> {
  title: '输入框',
  type: 'input',
  key: '',
  icon: markRaw(IconoirInputField),
  component: 'corgi-element-plus-input',
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
      value: '输入框',
    },
    type: {
      label: '输入框类型',
      type: 'inputTypeSelect',
      value: 'text',
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
    validate: {
      label: '校验规则',
      type: 'validateSelect',
      value: '',
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
  },
}
