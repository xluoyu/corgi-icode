import type { IWidgetItem } from '../type'

/**
 * 历史记录的最大储存数量
 */
const historyMaxStep = 5

export const historyWidgetList = ref<IWidgetItem[][]>([[]])

export function addHistoryWidgetList(list: IWidgetItem[]) {
  historyWidgetList.value.push(list)
  if (historyWidgetList.value.length > historyMaxStep) {
    historyWidgetList.value.shift()
  }
}
