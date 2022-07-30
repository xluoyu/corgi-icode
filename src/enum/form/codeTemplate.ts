/**
 * 通过对组件列表的遍历
 * 生成代码块
 *
 */
import { validateFn, validates } from './validate'
import type { IWidgetItem, renderWidgetCode } from '@/core'
import { objectToString } from '@/core'
const templates = import.meta.globEager('./*/template.ts')

export const CodeTemplate: Record<
  string, renderWidgetCode
> = Object.entries(templates).reduce((res, [key, cur]) => {
  const _key = key.match(/\/(\S*)\//)![1]
  res[_key] = cur.default
  return res
}, {} as Record<string, any>)

export function renderCode(widgetList: IWidgetItem[]) {
  console.log(widgetList)
  const formDataObj: Record<string, any> = {} // formData的对象
  const widgetVariableList: Record<string, any> = {} // 各个模块产生的私有变量
  const validateList: Record<string, any> = {} // 校验列表

  function eachList(widgetList: IWidgetItem[], formOptions?: {
    key: string // formDataName
    validate: boolean // form表单是否开启校验
  }) {
    let resStr = ''

    widgetList.forEach((widget) => {
      if (!CodeTemplate[widget.type])
        return

      const formValue = Object.entries(widget.form).reduce((pre, [key, cur]) => {
        pre[key] = cur.value
        return pre
      }, {} as Record<string, any>)

      let childrenStr = ''

      const itemStrData = CodeTemplate[widget.type](formValue, widget, formOptions)

      // 如果当前是form组件，将formData放入formDataObj中
      if (widget.type === 'form') {
        Object.assign(formDataObj, itemStrData.formData)

        if (formValue.validate) {
          Object.assign(validateList, {
            [`${itemStrData.formDataName}Rules`]: {},
          })
        }
      }

      // 如果是form组件下的子组件，合并当前的formData
      if (itemStrData.formData && formOptions) {
        Object.assign(formDataObj[formOptions.key], itemStrData.formData)
      }

      // 如果当前组件开启了校验，将校验列表放入validateList中
      if (formOptions && formOptions.validate && !widget.noForm) {
        const rules = []
        const trigger = widget.type === 'input' ? 'blur' : 'change'
        if (formValue.required) {
          rules.push({
            required: true,
            message: `${formValue._key} is required`,
            trigger,
          })
        }

        /**
         * 如果当前组件开启了校验，将校验列表放入validateList中
         */
        if (formValue.validate) {
          const validate = Object.keys(validates).includes(formValue.validate as string) ? validates[formValue.validate as keyof typeof validates] : formValue.validate
          // 把检验规则函数当作变量，存放到私有变量列表中
          Object.assign(widgetVariableList, {
            [`${formValue._key}Validate`]: `${validateFn(formValue._key, validate)}`.replace(
              /_rule/g,
              `${formValue._key}ValidateReg`,
            ).replace(/\$\{key\}/g, formValue._key),
          })

          rules.push({ validator: `${formValue._key}Validate`, trigger })
        }

        if (rules.length) {
          Object.assign(validateList[`${formOptions.key}Rules`], {
            [formValue._key]: rules,
          })
        }
      }

      /**
       * 添加各个模块的私有变量
       */
      if (itemStrData.privateVar) {
        Object.assign(widgetVariableList, itemStrData.privateVar)
      }

      /**
       * 如果有子节点，则递归调用
       */
      if (widget.children) {
        childrenStr = eachList(widget.children, widget.type === 'form' ? { key: itemStrData.formDataName!, validate: formValue.validate } : undefined)
      }
      let templateStr = ''

      if (typeof itemStrData.template === 'function') {
        templateStr = itemStrData.template(childrenStr)
      } else {
        templateStr = itemStrData.template
      }

      if (!widget.noForm) {
        templateStr = `<el-form-item label="${formValue.label}"${formOptions && formOptions.validate ? `prop="${formValue._key}"` : ''}>
          ${templateStr}
        </el-form-item>`
      }

      resStr += templateStr
    })

    return resStr
  }

  const templateStr = eachList(widgetList)

  /**
   * 渲染各个模块的私有变量
   */
  const formDataStr = Object.entries(formDataObj).reduce(
    (pre, [key, cur]) => {
      return `${pre}\nconst ${key} = reactive(${objectToString(cur)})`
    },
    '',
  )

  /**
   * 渲染各个模块的私有变量
   */
  const widgetVariableStr = Object.entries(widgetVariableList).reduce(
    (pre, [key, cur]) => {
      return `${pre}\nconst ${key} = ${objectToString(cur)}`
    },
    '',
  )
  /**
   * 渲染校验规则列表
   */
  const validateListStr = Object.entries(validateList).reduce(
    (pre, [key, cur]) => {
      return `${pre}\nconst ${key} = ${objectToString(cur)}`
    },
    '',
  )

  return `
<template>
  ${templateStr}
</template>

<script setup>
${formDataStr}
${widgetVariableStr}
${Object.keys(validateList).length ? validateListStr : ''}
</script>
`
}
