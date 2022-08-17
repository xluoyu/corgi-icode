/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-17 17:28:43
 */
import type { ILibsName } from '../libs'
import type { ILibReturnType, IMenu, ITemplate, IWidgetItem } from '../type'

// 白板上的默认数据
const defaultWidgetList = [
  {
    children: [],
    form: {
      'dataName': { label: '数据对象', type: 'input', value: '' },
      'inline': { label: '行内模式', type: 'switch', value: false },
      'label-position': { label: '标签位置', type: 'labelPosition', value: 'left' },
      'label-width': { label: '标签宽度', type: 'input', value: 'auto' },
      'size': { label: '组件大小', type: 'formSize', value: 'default' },
      'style.width': { label: '表单宽度', type: 'input', value: '' },
      'validate': { label: '开启验证', type: 'switch', value: false },
    },
    key: 'form_0',
    noForm: true,
    title: '表单',
    type: 'form',
  },
]

// 组件计数
export const uuId = ref(defaultWidgetList.length)

/**
 * 白板上的组件列表
 */
export const widgetList = ref<IWidgetItem[]>(defaultWidgetList)

/**
 * 当前活跃的组件key
 */
export const activeWidgetKey = ref<string>('')

/**
 * 组件列表的扁平化结构
 *
 * return => {
 *  [key]: IWidgetItem
 * }
 */
export const widgetListFlat = computed<Record<string, IWidgetItem>>(() => {
  const res: Record<string, IWidgetItem> = {}
  function forRun(list: IWidgetItem[]) {
    list.forEach((item) => {
      res[item.key] = item
      if (item.children) {
        forRun(item.children)
      }
    })
  }
  forRun(widgetList.value)
  return res
})

/**
 * 当前活跃的组件
 */
export const curActionWidget = computed(() => {
  if (activeWidgetKey.value === null) {
    return null
  }
  return widgetListFlat.value[activeWidgetKey.value]
})

/**
 * clone的模块实例
 */
export const curCloneWidgetKey = ref<string>('') // 当前克隆的组件key

/**
 * 菜单
 */
export const curLibName = ref<ILibsName>('element-plus')
export const menu = ref<IMenu>([])
export const defaultTemplateList = ref<ITemplate>([])

export const libStorage: Partial<Record<ILibsName, ILibReturnType>> = {}
