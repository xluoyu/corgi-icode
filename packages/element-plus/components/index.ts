/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-16 17:30:01
 */
import pkg from '../package.json'

export const Components = Object.entries(import.meta.glob('./*/index.ts')).reduce((pre, [key, val]) => {
  const componentName = `${pkg.name.substring(pkg.name.lastIndexOf('/') + 1)}-${key.match(/(?<=\/).*(?=\/)/g)![0]}`
  return {
    ...pre,
    [componentName]: val,
  }
}, {})
