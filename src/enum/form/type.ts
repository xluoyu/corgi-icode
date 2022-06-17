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
  component: string
  form: IFormItemOptions
  noForm?: boolean
}

export type IFormItemOptions = Record<string, {
  label: string
  type: keyof typeof CompConfig
  value: any
  tooltip?: string
}>

export type IFormItemOptionsArray = Array<{
  label: string
  key: string
  type: keyof typeof CompConfig
  value: any
  tooltip?: string
}>

export type withRegExp = string | number | boolean | RegExp | null
