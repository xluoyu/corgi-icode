/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 10:00:28
 */
import { ComponentsOptions } from './components/index'
import BaseTemplate from './templates/base'
console.log(ComponentsOptions)
export const Menu = [
  {
    title: '基础组件',
    children: [
      ComponentsOptions.button,
      ComponentsOptions.input,
    ],
  },
]

export const TemplateList = [
  BaseTemplate,
]
