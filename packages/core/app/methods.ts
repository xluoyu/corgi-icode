import { cloneDeep } from 'lodash-es'
import type { ILibReturnType, IWidgetItem } from '../type'
import { errorMsg, importLibs } from '../utils'
import type { ILibsName } from '../libs'
import { addHistoryWidgetList } from './history'
import { activeWidgetKey, curActionWidget, curCloneWidgetKey, curLibName, defaultTemplateList, libStorage, menu, uuId, widgetList, widgetListFlat } from './state'
import { injectSchedulerCbs } from './scheduler'

/**
 * 查找组件
 * @param key 组件的key
 * @returns
 */
export const findWidgetItem = (key: string) => {
  return widgetListFlat.value[key]
}

/**
 * 检测当前组件是否在form之下
 */
function isInFormWidget(item: string | IWidgetItem) {
  const widget: IWidgetItem | null = typeof item === 'string' ? findWidgetItem(item) : item

  if (!widget) {
    errorMsg('未找到当前组件', 'core/app/methods.ts line:23')
    return false
  }

  return !!getParentForm(widget)
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
  activeWidgetKey.value = curCloneWidgetKey.value // 修改当前的活跃组件key
  addHistoryWidgetList(widgetList.value) // 添加历史记录

  nextTick(() => {
    if (curActionWidget.value && !curActionWidget.value.noForm && !isInFormWidget(curActionWidget.value)) {
      alert('建议将当前组件放置于Form组件内')
    }
  })
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
  loadComponent(item.component!)
  return newObj
}

/**
 * 返回目标表单组件的formData
 * @param key
 * @returns
 */
export function getFormData(targetWidget: IWidgetItem) {
  if (!targetWidget || targetWidget.type !== 'form') {
    errorMsg(`未找到对应的form组件，key: ${targetWidget.key}`, 'core/app/methods.ts line: 81')
    return
  }

  return targetWidget.children!.reduce((pre, widget) => {
    if (widget.noForm)
      return pre
    pre[widget.key] = widget.form.value.value
    return pre
  }, {} as Record<string, any>)
}

/**
 * 获取父级的form组件
 */
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
    errorMsg('当前没有活跃的组件', 'core/app/methods.ts')
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

// 删除当前活跃组件
export function removeActionWidget() {
  if (!curActionWidget.value)
    return
  const parentChildren = curActionWidget.value.parent ? findWidgetItem(curActionWidget.value.parent).children as IWidgetItem[] : widgetList.value
  const idx = parentChildren.indexOf(curActionWidget.value)
  parentChildren.splice(idx, 1)
}

/**
 * 切换依赖的组件库
 *
 * @param key 组件库名称
 */
export async function changeLib(key: ILibsName) {
  let lib: ILibReturnType | null = null
  if (!libStorage[key]) {
    lib = await importLibs(key)

    if (lib) {
      libStorage[key] = Object.assign({ renderComponent: {} }, lib)
    }
  } else {
    lib = libStorage[key]!
  }

  if (lib) {
    curLibName.value = key
    menu.value = lib.Menu
    defaultTemplateList.value = lib.TemplateList
    injectSchedulerCbs(Object.keys(lib.Components).map(e => async() => await loadComponent(e)))
  }
}

/**
 * 挂载指定组件
 * @param key
 * @returns
 */
async function loadComponent(componentName: string) {
  try {
    if (window.app.component(componentName)) // 如果已经注册过则不需要再注册
      return
    const { default: component } = await libStorage[curLibName.value]!.Components[componentName]()
    libStorage[curLibName.value]!.renderComponent[componentName] = component
    window.app.component(componentName, component)
    if (component.dependents) {
      component.dependents.forEach(loadComponent)
    }
  } catch (err) {
    console.log(err)
  }
}
