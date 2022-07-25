import type { IFormComp } from '../type'
import MaterialSymbolsGridOn from '~icons/material-symbols/grid-on'

const data: IFormComp = {
  title: '网格',
  type: 'grid',
  key: '',
  icon: MaterialSymbolsGridOn,
  component: 'cg-grid',
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
