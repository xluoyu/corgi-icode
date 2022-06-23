import type { IFormData, IFormItemOptions } from './type'
import input from './input/template'
import select from './select/template'
import { mixinValue } from '@/utils'
import { formatArrt } from '@/utils/renderTemplate'
export const CodeTemplate: Record<string, (options: IFormItemOptions) => any> = {
  input,
  select,
}
export const renderCode = (formGroup: IFormData) => {
  let hasValidate = false // 是否开启校验
  const spaces = 0 // 空格数
  const spacesStep = 2 // 空格步进
  const formAttrs = Object.keys(formGroup.formOptions).map((key) => {
    const value = formGroup.formOptions[key].value
    if (key.includes('.')) {
      const keys = key.split('.')
      return `:${keys[0]}="{${keys[1]}: '${value}'}"`
    }
    /**
         * 表单开启了校验
         */
    if (key === 'validate' && value) {
      hasValidate = true
      return null
    }
    return formatArrt(key, value)
    // }
    // return pre
  }).filter(Boolean).join(' ')

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
      itemStr = `${itemStrData.template}`
    } else {
      itemStr = `<el-form-item label="${form.label.value}"${hasValidate ? ` prop="${form._key.value}"` : ''}>
      ${itemStrData.template}
    </el-form-item>`
    }

    return pre + itemStr
  }, '')

  const widgetVariableStr = Object.keys(widgetVariableList).reduce((pre, key) => {
    return `${pre}\nconst ${key} = ${widgetVariableList[key]}`
  }, '')

  const formDataStr = `{${Object.keys(formDataObj).reduce((pre, key) => {
    console.log(formDataObj[key])
    return `${pre}\n  ${key}: ${formDataObj[key] || '\'\''},`
  }, '')}\n}`

  return `<template>
  <el-form :model="formData" ${formAttrs}${hasValidate ? ' :rules="rules"' : ''}>
    ${widgetStr}
  </el-form>
</template>
  
<script lang='ts' setup>
const formData = reactive(${formDataStr})
${widgetVariableStr}
</script>
`
}
