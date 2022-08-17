/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-17 17:20:20
 */
export const libs = [
  {
    name: 'element-plus',
    icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
  },
  {
    name: 'naiveui',
    icon: 'https://www.naiveui.com/assets/naivelogo.93278402.svg',
  },
] as const

export const libsCDN = {
  'element-plus': '',
  'naiveui': '',
}

export type ILibsName = typeof libs[number]['name']
