/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-24 21:00:28
 */
import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

export default <renderWidgetCode> function(
  options,
  _formDataName,
) {
  const attrs = ['inline', 'label-width', 'label-position', 'size']
  const attrsStr = attrs
    .map(attr => formatArrt(`${attr}`, options[attr]))
    .filter(Boolean)
    .join(' ')

  const formDataName = options._key || _formDataName

  let filterStr = ''
  if (options.formType === 'filter') {
    filterStr = `
      Object.assgin(tableSearch, ${formDataName})
      getTableList()
    `
  }

  return {
    template: (children: string) => `<el-form ref="${`${formDataName}Ref`}" :model="${formDataName}" ${attrsStr} :rules='${formDataName}Rules'>
      ${children}
      <el-form-item>
        <el-button type="primary" @click="submit">
          ${options.formType === 'form' ? '提交' : '搜索'}
        </el-button>
        <el-button @click="reset">
          重置
        </el-button>
      </el-form-item>
    </el-form>`,
    formDataName,
    privateVar: {
      [`${formDataName}Ref`]: 'ref(null)',
      submit: `() => {
        ${`${formDataName}Ref`}.value.validate((valid) => {
          if (!valid) return
          console.log(${formDataName})
          ${filterStr}
        })
      }`,
      reset: `() => {
        ${`${formDataName}Ref`}.value.resetFields()
      }`,
    },
  }
}
