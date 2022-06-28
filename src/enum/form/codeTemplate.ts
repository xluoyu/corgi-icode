import type { IFormComp, IFormData, IFormItemOptions } from './type'
import { validateFn, validates } from './validate'
import { formatArrt } from '@/utils/renderTemplate'
const templates = import.meta.globEager('./*/template.ts')
export const CodeTemplate: Record<string, (options: IFormItemOptions, item: IFormComp) => any> = Object.keys(templates).reduce((res, key) => {
  const _key = key.match(/\/(\S*)\//)![1]
  res[_key] = templates[key].default
  return res
}, {} as Record<string, any>)

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
    const itemStrData = CodeTemplate[type](form, cur)

    if (itemStrData.privateVar) {
      Object.assign(widgetVariableList, itemStrData.privateVar)
    }
    if (itemStrData.formData) {
      Object.assign(formDataObj, itemStrData.formData || {})
    }

    if (cur.noForm) {
      itemStr = `${itemStrData.template}`
    } else {
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
