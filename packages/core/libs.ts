/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-19 14:50:29
 */
export const libs = [
  {
    name: 'element-plus',
    icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
    import: () => import('../element-plus'),
  },
  // {
  //   name: 'naive-ui',
  //   icon: 'https://www.naiveui.com/assets/naivelogo.93278402.svg',
  //   import: () => import('../naive-ui'),
  // },
] as const

// export const libsCDN = {
//   'element-plus': 'https://cdn.jsdelivr.net/npm/@corgi-icode/element-plus@0.0.0-beta.4/dist/index.es.min.js',
//   'naiveui': '',
// }

export type ILibsName = typeof libs[number]['name']
