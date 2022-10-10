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
    columns: {
      label: '列表',
      type: 'listOptions',
      value: {
        姓名: 'name',
        // eslint-disable-next-line no-template-curly-in-string
        年龄: '${age}岁',
        职业: ({ row }: any) => {
          return `${row.age}岁的${row.jb}`
        },
        性别: 'sex',
        地址: 'address',
        专业: 'major',
        学历: 'study',
      },
    },
    data: {
      label: '数据',
      type: 'codeEmit',
      value: [
        {
          name: '张三',
          age: 18,
          jb: '前端',
          sex: '男',
          address: '北京市海淀区望江东路123号北京市海淀区望江东路123号北京市海淀区望江东路123号',
          major: '计算机技术',
          study: '哈弗大学毕业-研究及上',
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
