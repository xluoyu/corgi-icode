import type { IFormData, IFormItemOptions } from './type'
import input from './input/template'
import select from './select/template'
import button from './button/template'
import checkbox from './checkbox/template'
import color from './color/template'
import divider from './divider/template'
import radio from './radio/template'
import _switch from './switch/template'
import text from './text/template'
import textarea from './textarea/template'
import { validateFn, validates } from './validate'
import { formatArrt } from '@/utils/renderTemplate'
export const CodeTemplate: Record<string, (options: IFormItemOptions) => any> = {
  input,
  select,
  button,
  checkbox,
  color,
  divider,
  radio,
  switch: _switch,
  text,
  textarea,
}
export const renderCode = (formGroup: IFormData) => {
  let hasValidate = false // 是否开启校验
  const validateList: Record<string, any> = {} // 校验列表
  const formAttrs = Object.keys(formGroup.formOptions).map((key) => {
    const value = formGroup.formOptions[key].value
    if (key.includes('.') && value) {
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
  }).filter(Boolean).join(' ')

  const formDataObj: Record<string, any> = {} // formData的对象
  const widgetVariableList: Record<string, any> = {} // 各个模块产生的私有变量

  /**
   * 渲染模块
   */
  const widgetStr = formGroup.widgetList.reduce((pre, cur) => {
    const { type, form } = cur
    if (!CodeTemplate[type])
      return pre
    let itemStr = ''
    const itemStrData = CodeTemplate[type](form)

    if (itemStrData.privateVar) {
      Object.assign(widgetVariableList, itemStrData.privateVar)
    }

    if (cur.noForm) {
      itemStr = `${itemStrData.template}`
    } else {
      formDataObj[form._key.value] = itemStrData.formatValue ? itemStrData.formatValue(form.value.value) : form.value.value
      itemStr = `<el-form-item label="${form.label.value}"${hasValidate ? ` prop="${form._key.value}"` : ''}>
      ${itemStrData.template}
    </el-form-item>`

      /**
       * 添加校验规则
       */
      if (hasValidate && (cur.form.validate || cur.form.required)) {
        const key = cur.form._key.value
        const trigger = cur.type === 'input' ? 'blur' : 'change'
        validateList[key] = []
        if (cur.form.required.value) {
          validateList[key].push({ required: true, message: `${key} is required`, trigger })
        }
        if (cur.form.validate) {
          let validate: string | RegExp | null = cur.form.validate?.value
          validate = (validate && Object.keys(validates).includes(validate as string) ? validates[validate as keyof typeof validates] : validate) as RegExp | null
          if (validate) {
            Object.assign(widgetVariableList, { [`${key}Validate`]: validateFn(key, validate) })
            validateList[key].push({ validator: `${key}Validate`, trigger })
          }
        }
      }
    }
    return pre + itemStr
  }, '')
  /**
   * 渲染各个模块的私有变量
   */
  const widgetVariableStr = Object.keys(widgetVariableList).reduce((pre, key) => {
    // 替换${key}
    const valueStr = `${widgetVariableList[key]}`.replace(/\$\{key\}/g, key)
    return `${pre}\nconst ${key} = ${valueStr}`
  }, '')

  /**
   * 渲染formData
   */
  const formDataStr = `{${Object.keys(formDataObj).reduce((pre, key) => {
    return `${pre}\n  ${key}: ${(typeof formDataObj[key] === 'object' ? JSON.stringify(formDataObj[key]) : `'${formDataObj[key]}'`)},`
  }, '')}\n}`

  const validateStr = `\nconst roles = {${Object.keys(validateList).reduce((pre, key) => {
    // 自定义校验format
    const validateValue = JSON.stringify(validateList[key]).replaceAll(`"${key}Validate"`, `${key}Validate`)
    return `${pre}\n  ${key}: ${validateValue},`
  }, '')}\n}`

  return `<template>
  <el-form :model="formData" ${formAttrs}${hasValidate ? ' :rules="rules"' : ''}>
    ${widgetStr}
  </el-form>
</template>
  
<script lang='ts' setup>
const formData = reactive(${formDataStr})
${widgetVariableStr}
${validateList.length ? validateStr : ''}
</script>

`
}
