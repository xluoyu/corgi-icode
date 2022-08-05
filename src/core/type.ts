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
  updateDataFn?: () => void // 用来更新组件内的数据
}

export type IWidgetItemForm = Record<
  string,
  {
    label: string
    type: string
    value: any
    isShow?: (options: any) => boolean
    changeCb?: (options: any) => void
  }
>

export type IWidgetItemFormOptions = objectT<{
  component: string
  [name: string]: any
}>

export type objectT<T> = Record<string, T>

export type renderWidgetCode = (options: Record<string, any>, IWidgetItem: IWidgetItem, formOptions?: {
  key: string // formDataName
  validate: boolean // form表单是否开启校验
}) => {
  template: string | ((arg: string) => string)
  formData?: Record<string, any>
  privateVar?: Record<string, any> // 组件内的私有变量
  formDataName?: string // form 的key
  importList?: Record<string, any> // 组件内的引入列表
  componentName?: string // 组件名称
  componentTemplate?: string // 私有组件的模板
}

export interface ITemplateOptions {
  title: string
  key: string
  type: 'template'
  photo?: string
  uuId: number
  widgetList: IWidgetItem[]
}
