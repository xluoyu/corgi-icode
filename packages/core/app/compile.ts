/**
 * 通过对组件列表的遍历
 * 生成代码块
 *
 */
import { isString } from '@vueuse/core'
import type { IWidgetItem } from '@corgi-icode/core'
import { objectToString } from '@corgi-icode/core'
import { curLibName, libStorage } from './state'

let validateFn: null | Function = null
/**
 * 对组件列表进行代码编译
 * @param widgetList
 * @returns
 */
export function compileCode(widgetList: IWidgetItem[]) {
  const renderComponents = libStorage[curLibName.value]!.renderComponent

  const formDataObj: Record<string, any> = {} // formData的对象
  const widgetVariableList: Record<string, any> = {} // 各个模块产生的私有变量
  const validateList: Record<string, any> = {} // 校验列表
  const importList: Record<string, any> = {} // 引入列表
  const fileList: Record<string, any> = {} // 文件列表

  function eachList(widgetList: IWidgetItem[], formDataName?: string) {
    let resStr = ''

    widgetList.forEach((widget) => {
      if (!renderComponents[widget.component])
        return

      const formValue = Object.entries(widget.form).reduce((pre, [key, cur]) => {
        pre[key] = cur.value
        return pre
      }, {} as Record<string, any>)

      let childrenStr = ''

      const itemStrData = renderComponents[widget.component].renderCodeTemplate(formValue, formDataName)

      // 如果当前是form组件，将formData放入formDataObj中
      if (widget.type === 'form') {
        Object.assign(formDataObj, itemStrData.formData)

        Object.assign(validateList, {
          [`${itemStrData.formDataName}Rules`]: {},
        })

        validateFn = widget.validateFn || null
      }

      // 如果是form组件下的子组件，合并当前的formData
      if (itemStrData.formData && formDataName) {
        Object.assign(formDataObj[formDataName], itemStrData.formData)
      }

      // 组件校验相关
      if (!widget.noForm) {
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
        if (formValue.validate && validateFn) {
          // 把检验规则函数当作变量，存放到私有变量列表中
          Object.assign(widgetVariableList, {
            [`${formValue._key}Validate`]: `${validateFn(formValue._key, formValue.validate)}`.replace(
              /_rule/g,
                `${formValue._key}ValidateReg`,
            ).replace(/\$\{key\}/g, formValue._key),
          })

          rules.push({ validator: `${formValue._key}Validate`, trigger })
        }

        if (rules.length) {
          Object.assign(validateList[`${formDataName}Rules`], {
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
        childrenStr = eachList(widget.children, widget.type === 'form' ? itemStrData.formDataName : undefined)
      }
      let templateStr = ''

      if (typeof itemStrData.template === 'function') {
        templateStr = itemStrData.template(childrenStr)
      } else {
        templateStr = itemStrData.template
      }

      // if (!widget.noForm) {
      //   templateStr = `<el-form-item label="${formValue.label}"${formOptions && formOptions.validate ? `prop="${formValue._key}"` : ''}>
      //       ${templateStr}
      //     </el-form-item>`
      // }

      // 如果当前组件有私有模板，添加到文件列表中
      if (itemStrData.componentTemplate && itemStrData.componentName) {
        fileList[itemStrData.componentName] = itemStrData.componentTemplate
      }

      if (itemStrData.importList) {
        Object.assign(importList, itemStrData.importList)
      }

      resStr += templateStr
    })

    return resStr
  }

  const templateStr = eachList(widgetList)

  /**
     * formdata
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

  const importListStr = Object.entries(importList).reduce(
    (pre, [key, cur]) => {
      return `${pre}\nimport ${isString(cur) ? cur : `{${cur.join(', ')}}`} from '${key}'`
    },
    '',
  )

  const baseTemplate = `
    <template>
      ${templateStr}
    </template>
    
    <script setup>
    ${importListStr}${formDataStr}${widgetVariableStr}${Object.keys(validateList).length ? validateListStr : ''}
    </script>
    `

  return {
    base: baseTemplate,
    ...fileList,
  }
}
