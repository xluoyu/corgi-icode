// import { validateFn, validates } from './validate'
import type { IWidgetItem } from '@/core'
import { objectToString } from '@/core'
const templates = import.meta.globEager('./*/template.ts')
export const CodeTemplate: Record<
  string,
  (arg0: Record<string, any>, arg1: IWidgetItem) => {
    formData?: Record<string, any>
    template: string | ((arg0: string) => string)
    privateVar?: Record<string, any>
    formDataName?: string
  }
> = Object.keys(templates).reduce((res, key) => {
  const _key = key.match(/\/(\S*)\//)![1]
  res[_key] = templates[key].default
  return res
}, {} as Record<string, any>)

export function renderCode(widgetList: IWidgetItem[]) {
  console.log(widgetList)
  const formDataObj: Record<string, any> = {} // formData的对象
  const widgetVariableList: Record<string, any> = {} // 各个模块产生的私有变量
  const validateList: Record<string, any> = {} // 校验列表

  function eachList(widgetList: IWidgetItem[], formOptions?: {
    key: string
    validate: boolean
  }) {
    let resStr = ''

    widgetList.forEach((widget) => {
      if (!CodeTemplate[widget.type])
        return

      const formValue = Object.keys(widget.form).reduce((pre, key) => {
        pre[key] = widget.form[key].value
        return pre
      }, {} as Record<string, any>)

      let childrenStr = ''

      const itemStrData = CodeTemplate[widget.type](formValue, widget)
      console.log(itemStrData)

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
        if (formValue.required) {
          rules.push({
            required: true,
            message: `${formValue._key} is required`,
            trigger: widget.type === 'input' ? 'blur' : 'change',
          })
        }

        if (formValue.validate) {
          // let validate =
        }
        // Object.assign(validateList[`${formOptions.key}Rules`], )
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
  console.log(templateStr, formDataObj, widgetVariableList)

  /**
   * 渲染各个模块的私有变量
   */
  const formDataStr = Object.keys(formDataObj).reduce(
    (pre, key) => {
      return `${pre}\nconst ${key} = reactive(${objectToString(formDataObj[key])})`
    },
    '',
  )

  /**
   * 渲染各个模块的私有变量
   */
  const widgetVariableStr = Object.keys(widgetVariableList).reduce(
    (pre, key) => {
      return `${pre}\nconst ${key} = ${objectToString(widgetVariableList[key])}`
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
</script>
`
}

// export const renderCodeOld = (widgetList: IWidgetItem[]) => {
//   let hasValidate = false // 是否开启校验
//   const validateList: Record<string, any> = {} // 校验列表
//   const formAttrs = Object.keys(formGroup.formOptions)
//     .map((key) => {
//       const value = formGroup.formOptions[key].value
//       if (key.includes('.') && value) {
//         const keys = key.split('.')
//         return `:${keys[0]}="{${keys[1]}: '${value}'}"`
//       }
//   /**
//    * 表单开启了校验
//    */
//   if (key === 'validate' && value) {
//     hasValidate = true
//     return null
//   }
//   return formatArrt(key, value)
// })
// .filter(Boolean)
// .join(' ')

// const formDataObj: Record<string, any> = {} // formData的对象
// const widgetVariableList: Record<string, any> = {} // 各个模块产生的私有变量

/**
   * 渲染模块
   */
// const widgetStr = formGroup.widgetList.reduce((pre, cur) => {
//   const { type, form } = cur
//   if (!CodeTemplate[type])
//     return pre
//   let itemStr = ''
//   const itemStrData = CodeTemplate[type](form, cur, { hasValidate })

//   if (itemStrData.privateVar) {
//     Object.assign(widgetVariableList, itemStrData.privateVar)
//   }
//   if (itemStrData.formData) {
//     Object.assign(formDataObj, itemStrData.formData || {})
//   }

// if (cur.noForm) {
//   itemStr = `${itemStrData.template}`
// } else {
//   itemStr = `<el-form-item label="${form.label.value}"${
//     hasValidate ? ` prop="${form._key.value}"` : ''
//   }>
//   ${itemStrData.template}
// </el-form-item>`

/**
       * 添加校验规则
       */
// if (hasValidate && (cur.form.validate || cur.form.required)) {
//   const key = cur.form._key.value
//   const trigger = cur.type === 'input' ? 'blur' : 'change'
//   validateList[key] = []
//   if (cur.form.required.value) {
//     validateList[key].push({
//       required: true,
//       message: `${key} is required`,
//       trigger,
//     })
//   }
//       if (cur.form.validate) {
//         let validate: string | RegExp | null = cur.form.validate?.value
//         validate = (
//           validate && Object.keys(validates).includes(validate as string)
//             ? validates[validate as keyof typeof validates]
//             : validate
//         ) as RegExp | null
//         if (validate) {
//           Object.assign(widgetVariableList, {
//             [`${key}ValidateReg`]: validate,
//             [`${key}Validate`]: `${validateFn(key, validate)}`.replace(
//               /_rule/g,
//               `${key}ValidateReg`,
//             ),
//           })
//           validateList[key].push({ validator: `${key}Validate`, trigger })
//         }
//       }
//     }
//   }
//   return pre + itemStr
// }, '')
/**
   * 渲染各个模块的私有变量
   */
// const widgetVariableStr = Object.keys(widgetVariableList).reduce(
//   (pre, key) => {
//     // 替换${key}
//     const valueStr = `${widgetVariableList[key]}`.replace(/\$\{key\}/g, key)
//     return `${pre}\nconst ${key} = ${valueStr}`
//   },
//   '',
// )

/**
   * 渲染formData
   */
// const formDataStr = `{${Object.keys(formDataObj).reduce((pre, key) => {
//   return `${pre}\n  ${key}: ${
//     typeof formDataObj[key] === 'object'
//       ? JSON.stringify(formDataObj[key])
//       : `'${formDataObj[key]}'`
//   },`
// }, '')}\n}`

// const validateStr = `\nconst roles = {${Object.keys(validateList).reduce(
//   (pre, key) => {
//     // 自定义校验format
//     const validateValue = JSON.stringify(validateList[key]).replaceAll(
//       `"${key}Validate"`,
//       `${key}Validate`,
//     )
//     return `${pre}\n  ${key}: ${validateValue},`
//   },
//   '',
// )}\n}`

//   return `<template>
//   <el-form :model="formData" ${formAttrs}${
//     hasValidate ? ' :rules="rules"' : ''
//   }>
//     ${widgetStr}
//   </el-form>
// </template>

// <script lang='ts' setup>
// const formData = reactive(${formDataStr})
// ${widgetVariableStr}
// ${Object.keys(validateList).length ? validateStr : ''}
// </script>

// `
// }
