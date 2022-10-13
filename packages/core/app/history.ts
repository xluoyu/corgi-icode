import { cloneDeep } from 'lodash-es'
import type { IWidgetItem } from '../type'

/**
 * 历史记录的最大储存数量
 */
const historyMaxStep = 5

export const historyWidgetList = ref<IWidgetItem[][]>([[]])

/**
 * 将组件列表添加到历史记录
 * @param list
 */
export function addHistoryWidgetList(list: IWidgetItem[]) {
  historyWidgetList.value.push(cloneDeep(list))
  if (historyWidgetList.value.length > historyMaxStep) {
    historyWidgetList.value.shift()
  }
}
