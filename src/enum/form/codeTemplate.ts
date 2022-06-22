import type { IFormData, IFormItemOptions } from './type'
import input from './input/template'
import { mixinValue } from '@/utils'
export const CodeTemplate: Record<string, (options: IFormItemOptions) => any> = {
  input,
}
export const renderCode = (formGroup: IFormData) => {
  let hasValidate = false
  const formAttrs = Object.keys(formGroup.formOptions).reduce((pre, key) => {
    const value = formGroup.formOptions[key].value
    if (key.includes('.')) {
      pre = mixinValue(`:${key}`, value, pre)
    } else {
      /**
         * 表单开启了校验
         */
      if (key === 'validate' && value) {
        hasValidate = true
        return pre
      }
      pre[key] = value
    }
    return pre
  }, {} as Record<string, any>)

  const formDataObj: Record<string, any> = {} // formData的对象
  const widgetVariableList: Record<string, any> = {} // 各个模块产生的私有变量

  const widgetStr = formGroup.widgetList.reduce((pre, cur) => {
    const { type, form } = cur
    if (!CodeTemplate[type])
      return pre
    let itemStr = ''
    const itemStrData = CodeTemplate[type](form)

    formDataObj[form._key.value] = form.value.value

    if (itemStrData.privateVar) {
      Object.assign(widgetVariableList, itemStrData.privateVar)
    }

    if (cur.noForm) {
      itemStr = `\n${itemStrData.template}`
    } else {
      itemStr = `
<el-form-item label="${form.label.value}"${hasValidate ? ` prop="${form._key.value}"` : ''}>
  ${itemStrData.template}
</el-form-item>
`
    }

    return pre + itemStr
  }, '')

  const widgetVariableStr = Object.keys(widgetVariableList).reduce((pre, key) => {
    return `${pre}\n  const ${key}: ${widgetVariableList[key]},`
  }, '')

  return `<template>
  <el-form :model="formData" ${formAttrs}${hasValidate ? ' :rules="rules"' : ''}>
    ${widgetStr}
  </el-form>
</template>
  
<script lang='ts' setup>
const formData = reactive(${JSON.stringify(formDataObj)})
${widgetVariableStr}
</script>
`
}
