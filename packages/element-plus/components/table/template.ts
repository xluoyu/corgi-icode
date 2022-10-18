import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt, objectToString } from '@corgi-icode/core'

const run: renderWidgetCode = (options, _formDataName) => {
  const attrs = ['stripe', 'border']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, options[attr]))
    .filter(Boolean)
    .join('\n')

  const columns = Object.keys(options.columns).reduce((pre, key) => {
    const value = options.columns[key] as string
    let newValue = ''
    if (value.includes('${')) {
      const reg = /\$\{(.+?)\}/g
      const keyReg = '\\$\\{(.+?)\\}'
      const res = value.match(reg)
      res?.forEach((str) => {
        const regExp = str.match(keyReg)
        if (regExp) {
          newValue = value.replace(str, `{{row.${regExp[1]}}}`)
        }
      })
    }

    return `${pre}<el-table-column label="${key}"${value.includes('${') ? '' : `prop="${options.columns[key]}"`}>${value.includes('${')
? `<templte #default="{row}">
    <span>${newValue}</span>
  </templte>`
: ''}</el-table-column>`
  }, '')

  let pagination = ''
  const paginationFn: Record<string, any> = {}
  if (options.hasPagination) {
    pagination = `
  <el-pagination v-model:currentPage="tableSearch.currentPage" small background layout="prev, pager, next" :page-size="tableSearch.pageSize" :total="tableTotal" @current-change="handleCurrentChange"/>`

    paginationFn.handleCurrentChange = `(val) => {
      tableSearch.currentPage = val
      getTableList()
    }`
  }

  return {
    privateVar: {
      [options._key]: `ref(${objectToString(options.data)})`,
      tableSearch: `reactive({
        pageSize: options.pageSize,
        currentPage: 0
      })`,
      tableTotal: 'ref(99)',
      getTableList: `() => {
        YourGetListApi(tableSearch).then(res => {
          tableSearch.pageSize = res.data.pageSize
          tableTotal.value = res.data.total
          ${options._key}.value = res.data.list
        })
      }`,
      ...paginationFn,
    },
    endScript: `
    onMounted(() => {
      getTableList()
    })`,
    template: `<el-table :data="${options._key}" ${attrsStr} style="margin-bottom: 20px">
      ${columns}
    </el-table>
    ${pagination}`,
  }
}

export default run
