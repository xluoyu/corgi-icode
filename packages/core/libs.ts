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

export const validates: { label: string; value: RegExp }[] = [
  {
    label: '手机号',
    value: /^1[3456789]\d{9}$/,
  },
  {
    label: '邮箱',
    value: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  },
  {
    label: '身份证',
    value: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  },
]
