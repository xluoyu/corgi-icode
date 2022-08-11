/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-11 16:12:26
 */
import type { IWidgetItem } from '@/core'
import MaterialSymbolsTableChartOutline from '~icons/material-symbols/table-chart-outline'

const data: IWidgetItem = {
  title: '表格',
  type: 'table',
  key: '',
  icon: MaterialSymbolsTableChartOutline,
  component: 'cg-table',
  noForm: true,
  children: [],
  form: {
    columns: {
      label: '列表',
      type: 'selectOptions',
      value: [
        { label: '名称', value: 'name' },
        { label: '年龄', value: 'age' },
        { label: '地址', value: 'address' },
      ],
    },
    data: {
      label: '数据',
      type: 'codeEmit',
      value: [
        {
          name: '张三',
          age: 18,
          address: '北京市朝阳区',
        },
        {
          name: '李四',
          age: 19,
          address: '北京市海淀区',
        },
      ],
    },

  },
}

export default data
