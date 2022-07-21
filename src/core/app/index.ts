import { cloneDeep } from 'lodash'
import type { IWidgetItem } from '../type'

import { addHistoryWidgetList } from './history'

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
 */
const widgetListFlat = computed<Record<string, IWidgetItem>>(() => {
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
 * 操作历史记录
 */
export { historyWidgetList } from './history'

/**
 * clone的模块实例
 */
const curCloneWidgetKey = ref<string>('') // 当前克隆的组件key
/**
 * 在drag clone 时
 * 添加上独立的key
 * @param item 模块实例
 */
export function cloneNewWidget(item: IWidgetItem) {
  const newObj = cloneDeep(item)
  const key = `${item.type}_${uuId.value}`
  newObj.key = key
  delete newObj.icon
  if (newObj.form._key) {
    newObj.form._key.value = key
  }
  uuId.value++
  curCloneWidgetKey.value = key
  return newObj
}

export function addNewWidget(parentKey: string) {
  if (parentKey) {
    const parent = widgetListFlat.value[parentKey]
    if (!parent) {
      return
    }
    parent.children!.forEach((item) => {
      item.parent = parentKey
    })
  }

  activeWidgetKey.value = curCloneWidgetKey.value // 修改当前的活跃组件key
  addHistoryWidgetList(widgetList.value) // 添加历史记录
}
