/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 15:46:22
 */
import type { IWidgetItem } from '@corgi-icode/core/type'
import pkg from '../package.json'

export const optionsWithComponent = (componentName: string) => {
  return `${pkg.name.substring(pkg.name.lastIndexOf('/') + 1)}-${componentName}`
}

export const Components = Object.entries(import.meta.glob('./*/index.ts')).reduce((pre, [key, val]) => {
  const componentName = `${pkg.name.substring(pkg.name.lastIndexOf('/') + 1)}-${key.match(/(?<=\/).*(?=\/)/g)![0]}`
  return {
    ...pre,
    [componentName]: val,
  }
}, {}) as Record<string, () => Promise<any>>

export const ComponentsOptions = Object.entries(import.meta.glob('./*/options.ts', { eager: true })).reduce((pre, [key, val]) => {
  const componentName = `${key.match(/(?<=\/).*(?=\/)/g)![0]}`
  ;(val as any).default.component = optionsWithComponent(componentName)

  return {
    ...pre,
    [componentName]: (val as any).default as IWidgetItem,
  }
}, {}) as Record<string, IWidgetItem>

console.log(ComponentsOptions)
