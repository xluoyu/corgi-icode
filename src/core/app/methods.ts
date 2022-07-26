import { cloneDeep } from 'lodash'
import type { IWidgetItem } from '../type'
import { errorMsg } from '../utils'
import { addHistoryWidgetList } from './history'
import { activeWidgetKey, curActionWidget, curCloneWidgetKey, uuId, widgetList, widgetListFlat } from './state'

/**
 * 查找组件
 * @param key 组件的key
 * @returns
 */
export const findWidgetItem = (key: string) => {
  return widgetListFlat.value[key]
}

/**
 * 添加组件
 *
 * 这里并不是真实的添加
 * 添加组建的功能在DraggableArea中已自动完成，这里只是把父级key绑定到每一个子组件上
 * @param parentKey 组件的父级key
 * @returns
 */
export function addNewWidget(parentKey?: string) {
  if (parentKey) {
    const parent = widgetListFlat.value[parentKey]
    if (!parent) {
      return
    }
    parent.children!.forEach((item) => {
      item.parent = parentKey
    })
  }
  console.log(curCloneWidgetKey.value)
  activeWidgetKey.value = curCloneWidgetKey.value // 修改当前的活跃组件key
  addHistoryWidgetList(widgetList.value) // 添加历史记录
}

/**
 * 在drag clone 时
 * 添加上独立的key
 * 并记录当前克隆的组件key，方便在addNewWidget中使用
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

/**
 * 返回目标表单组件的formData
 * @param key
 * @returns
 */
export function getFormData(key: string) {
  const targetWidget = findWidgetItem(key)
  if (!targetWidget || targetWidget.type !== 'form') {
    errorMsg(`未找到对应的form组件，key: ${key}`, 'core/app/methods.ts line: 66')
    return
  }

  return targetWidget.children!.reduce((pre, widget) => {
    if (widget.noForm)
      return pre
    pre[widget.key] = widget.form.value.value
    return pre
  }, {} as Record<string, any>)
}

export function getParentForm(widget: IWidgetItem): null | IWidgetItem {
  if (!widget.parent)
    return null
  const parent = findWidgetItem(widget.parent)
  if (!parent)
    return null

  if (parent.type !== 'form') {
    return getParentForm(parent)
  } else {
    return parent
  }
}

/**
 * 更新活跃组件的属性值
 *
 * 如果更新的key为_key(表单绑定节点)、value(默认值), 会去更新父级表单的formdata
 * @param key
 * @param value
 * @returns
 */
export function updateActionWidgetOptions(key: string, value: any) {
  if (!curActionWidget.value) {
    errorMsg('当前没有活跃的组件', 'core/app/methods.ts line: 95')
    return
  }

  curActionWidget.value.form[key].value = value

  if ((key === '_key' || key === 'value') && curActionWidget.value.parent) {
    // updateActionWidgetOptions('parent', value)
    const parentFormWidgetItem = getParentForm(curActionWidget.value)

    if (parentFormWidgetItem && parentFormWidgetItem.updateDataFn) {
      nextTick(parentFormWidgetItem.updateDataFn)
    }
  }
}

/**
 * 导出完整的数据
 * @returns
 */
export function returnData(): IWidgetItem[] {
  return cloneDeep(widgetList.value)
}
