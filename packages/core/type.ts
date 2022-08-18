/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 15:23:12
 */
import type { FunctionalComponent, SVGAttributes } from 'vue'
import type widgetOptions from '../ui/src/enum/widgetOptions'

export interface IWidgetItem {
  title: string // 标题
  type: string // 组件类型，需要与组件名称保持一致
  icon?: FunctionalComponent<SVGAttributes, {}>
  component?: string // 调用组件名称
  key: string // 自动生成的key
  form: IWidgetItemForm // 属性配置
  noForm?: boolean // 是否为form下组件
  children?: IWidgetItem[]
  parent?: string
  updateDataFn?: () => void // 用来更新组件内的数据
}

export type IWidgetItemForm = Record<
  string,
  {
    label: string
    type: keyof typeof widgetOptions
    value: any
    isShow?: (options: any) => boolean
    changeCb?: (options: any) => void
  }
>

/**
 * 编译组件代码
 */
export type renderWidgetCode = (options: Record<string, any>, formOptions?: {
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

/**
 * 模板数据
 */
export interface ITemplateOptions {
  title: string
  key: string
  type: 'template'
  photo?: string
  uuId: number
  widgetList: IWidgetItem[]
}

export type IMenu = { title: string; children: IWidgetItem[] }[]
export type ITemplate = ITemplateOptions[]

export interface ILibReturnType {
  Menu: IMenu
  TemplateList: ITemplate
  Components: Record<string, any>
}
