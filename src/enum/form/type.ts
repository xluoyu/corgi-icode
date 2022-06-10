export type IFormList = Array<{
  title: string
  children: Array<IFormComp>
}>

export interface IFormComp {
  title: string
  type: string
  component: any
  form: Array<{
    label: string
    key: string
    type: string
    value?: any
    options?: Array<any>
  }>
}
