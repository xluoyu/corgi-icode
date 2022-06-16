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
  form: any[]
  // Array<{
  //   label: string
  //   key: string
  //   type: string
  //   value?: any
  //   options?: Array<any>
  // }>
}

export interface IFormItemOptions {
  label: string
  key: string
  type: keyof typeof CompConfig
  value: string | number | boolean | null
}
