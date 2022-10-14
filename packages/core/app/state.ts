/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-24 20:54:23
 */
import type { ILibsName } from '../libs'
import type { ILibReturnType, IMenu, ITemplate, IWidgetItem } from '../type'

// 组件计数
export const uuId = ref(0)

/**
 * 白板上的组件列表
 */
export const widgetList = ref<IWidgetItem[]>([])

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
export const curLibName = ref<ILibsName>('naive-ui')
export const menu = ref<IMenu>([])
export const defaultTemplateList = ref<ITemplate>([])

export const libStorage: Partial<Record<ILibsName, ILibReturnType & { renderComponent: Record<string, any> }>> = {}
