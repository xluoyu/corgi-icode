/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-12 16:48:14
 */
import type { IWidgetItem } from '@corgi-icode/core'
import MaterialSymbolsTableChartOutline from '~icons/material-symbols/table-chart-outline'

const data: IWidgetItem = {
  title: '表格',
  type: 'table',
  key: '',
  icon: markRaw(MaterialSymbolsTableChartOutline),
  noForm: true,
  children: [],
  form: {
    _key: {
      label: '数据源',
      type: 'input',
      value: 'tableData',
    },
    columns: {
      label: '列表',
      type: 'listOptions',
      value: {
        姓名: 'name',
        // eslint-disable-next-line no-template-curly-in-string
        年龄: '${age}岁',
        地址: 'address',
      },
    },
    data: {
      label: '数据',
      type: 'codeEmit',
      value: [
        {
          name: '张三',
          age: 18,
          address: '浙江省杭州市西湖区断桥景点旁第三棵树下',
        },
      ],
    },
    stripe: {
      label: '斑马线',
      type: 'switch',
      value: false,
    },
    border: {
      label: '边框',
      type: 'switch',
      value: false,
    },
    hasPagination: {
      label: '需要分页',
      type: 'switch',
      value: true,
    },
    pageSize: {
      label: '每页个数',
      type: 'inputNumer',
      value: 20,
    },
  },
}

export default data
