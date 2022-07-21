export interface IWidgetItem {
  title: string
  type: string
  icon?: any
  key: string
  component: string
  form: IWidgetItemForm
  noForm?: boolean
  children?: IWidgetItem[]
  parent?: string
}

export type IWidgetItemForm = Record<
  string,
  {
    label: string
    type: string
    value: any
  }
>

export type IWidgetItemFormOptions = Record<
  string,
  {
    component: string
    [name: string]: any
  }
>
