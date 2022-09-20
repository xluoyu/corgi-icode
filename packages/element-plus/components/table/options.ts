/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-12 16:48:14
 */
import type { IWidgetItemOmitComponent } from '@corgi-icode/core'
import MaterialSymbolsTableChartOutline from '~icons/material-symbols/table-chart-outline'

const data: IWidgetItemOmitComponent = {
  title: '表格',
  type: 'table',
  key: '',
  icon: markRaw(MaterialSymbolsTableChartOutline),
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

  },
}

export default data
