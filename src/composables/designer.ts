import type { InjectionKey } from 'vue'
import { cloneDeep } from 'lodash'
import { FormOptions } from '@/enum/form'
import type { IFormComp, IFormData } from '@/enum/form/type'
const historyMaxStep = 5
export const uuId = ref(0)
export const historyWidgetList = ref<IFormComp[][]>([[]])

function addHistoryWidgetList(list: IFormComp[]) {
  historyWidgetList.value.push(list)
  if (historyWidgetList.value.length > historyMaxStep) {
    historyWidgetList.value.shift()
  }
}

export function addNewWidget(item: IFormComp) {
  const newObj = cloneDeep(item)
  const key = `${item.type}_${uuId.value}`
  newObj.key = key
  delete newObj.icon
  if (newObj.form._key) {
    newObj.form._key.value = key
  }
  uuId.value++

  return newObj
}

export function createFormGroup() {
  uuId.value = 0
  const curCloneWidgetKey = ref<string>('')
  /**
   * 当前的form配置
   */
  const formOptions = reactive(FormOptions)
  /**
   * 白板上的组件集合
   */
  const widgetList = ref<IFormComp[]>([])
  /**
   * 组件集合的扁平化结构
   *
   * Record<IFormComp.key, IFormComp>
   */
  const widgetListFlat = computed<Record<string, IFormComp>>(() => {
    const res: Record<string, IFormComp> = {}
    function forRun(list: IFormComp[]) {
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
   * 当前活跃的组件key
   */
  const activeWidgetKey = ref<string>('')
  const changeActiveWidget = (key: string) => {
    if (!key)
      return
    activeWidgetKey.value = key
  }

  const findWidgetItem = (_key: string) => {
    return widgetListFlat.value[_key]
  }

  /**
   * 当前活跃的组件
   */
  const curActionWidget = computed(() => {
    if (activeWidgetKey.value === null) {
      return null
    }
    return widgetListFlat.value[activeWidgetKey.value]
  })

  /**
   * 模拟生成 表单的数据
   */
  const getFormSimulateData = () => {
    return widgetList.value.reduce((pre, item) => {
      if (item.noForm)
        return pre
      const key = item.form._key.value as string
      const value = item.form.value.value
      pre[key] = value || ''
      return pre
    }, {} as Record<string, any>)
  }
  const formSimulateData = ref(getFormSimulateData())
  watch(() => widgetList.value.length, () => {
    formSimulateData.value = getFormSimulateData()
  })

  /**
   * 更新组件的模拟value
   * @param param0
   */
  const updateWidgetSimulateValue = ({ key, value }: { key: string; value: any }) => {
    formSimulateData.value[key] = value
  }

  /**
   * 更新form配置
   * @param param0
   * @param index
   */
  const updateFormOptions = ({ key, value }: { key: string; value: any }) => {
    formOptions[key].value = value
  }

  const updateActionWidgetOptions = ({ key, value }: { key: string; value: any }) => {
    curActionWidget.value!.form[key].value = value
    if (key === '_key' || key === 'value') {
      nextTick(() => {
        formSimulateData.value = getFormSimulateData()
      })
    }
  }

  const returnFormData = (): IFormData => {
    return {
      formOptions: cloneDeep(formOptions),
      widgetList: cloneDeep(widgetList.value),
    }
  }

  const addHistory = () => {
    addHistoryWidgetList(cloneDeep(widgetList.value))
  }

  return {
    formOptions,
    widgetList,
    formSimulateData,
    activeWidgetKey,
    curActionWidget,
    curCloneWidgetKey,
    returnFormData,
    changeActiveWidget,
    updateWidgetSimulateValue,
    updateFormOptions,
    updateActionWidgetOptions,
    findWidgetItem,
    addHistory,
  }
}

export type ICreateFormGroup = ReturnType<typeof createFormGroup>

export const ProvideFormGroup = Symbol('ProvideFormGroup') as InjectionKey<ICreateFormGroup>
