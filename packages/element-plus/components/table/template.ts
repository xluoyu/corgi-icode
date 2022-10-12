import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'

const run: renderWidgetCode = (options, _formDataName) => {
  const attrs = ['stripe', 'border']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join('\n')

  const columns = Object.keys(options.columns).reduce((pre, key) => {
    let value = options.columns[key]
    if (value.includes('${')) {
      const reg = /\$\{(.+?)\}/g
      const keyReg = '\\$\\{(.+?)\\}'
      const res = value.match(reg)

      res?.forEach((str) => {
        const regExp = str.match(keyReg)
        if (regExp) {
          value = value.replace(str, row[regExp[1]])
        }
      })
      console.log(value)

      // 这里直接封装成组件的形式，插入到el-table-column的插槽中
      // value = '${row.' +
      // function({ row }: any) {
      //   let valueStr = props.columns[key]

      //   return h('span', valueStr)
      // }
    }

    return `${pre}<el-table-column :label="${key}"${value.includes('${') ? '' : `:prop="${options.columns[key]}"`}>
      ${value.includes('${')
? `<templte #default="{row}">
  
      </templte>`
: ''}
    </el-table-column>`
  }, '')

  return {
    formData: {
      [options._key]: options.data,
    },
    template: `<el-table :data="${options._key}" ${attrsStr}>
      ${columns}
    </el-table>`,
  }
}

export default run
