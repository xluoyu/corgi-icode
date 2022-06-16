import type CompConfig from './CompConfig'

export type IFormList = Array<{
  title: string
  children: Array<IFormComp>
}>

export interface IFormComp {
  title: string
  type: string
  icon?: any
  key: string
  component: any
  form: IFormItemOptions
  // Array<{
  //   label: string
  //   key: string
  //   type: string
  //   value?: any
  //   options?: Array<any>
  // }>
}

export type IFormItemOptions = Record<string, {
  label: string
  type: keyof typeof CompConfig
  value: string | number | boolean | null
  tooltip?: string
}>

export type IFormItemOptionsArray = Array<{
  label: string
  key: string
  type: keyof typeof CompConfig
  value: string | number | boolean | null
  tooltip?: string
}>

export type withRegExp = string | number | boolean | RegExp | null
