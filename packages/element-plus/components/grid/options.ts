/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-11 10:47:07
 */
import type { IWidgetItem } from '@corgi-icode/core'
import MaterialSymbolsGrid4x4Rounded from '~icons/material-symbols/grid-4x4-rounded'

const data: IWidgetItem = {
  title: '网格',
  type: 'grid',
  key: '',
  icon: markRaw(MaterialSymbolsGrid4x4Rounded),
  noForm: true,
  form: {
    gutter: {
      label: '栅格间隔',
      type: 'inputNumer',
      value: 0,
    },
  },
  children: [],
}

export default data
