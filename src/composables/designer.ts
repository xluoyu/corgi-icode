import type { InjectionKey } from 'vue'
import { cloneDeep } from 'lodash'
import { FormOptions } from '@/enum/form'
import type { IFormComp, IFormData } from '@/enum/form/type'
import { findDeepItem } from '@/utils'

export function createFormGroup() {
  /**
   * 当前的form配置
   */
  const formOptions = reactive(FormOptions)
  /**
   * 白板上的组件集合
   */
  const widgetList = ref<IFormComp[]>([])
  /**
   * 当前活跃的组件下标
   */
  const activeWidgetIndex = ref<number | null>(null)
  const changeActiveWidget = (index: number) => {
    activeWidgetIndex.value = index
  }

  /**
   * 当前活跃的组件
   */
  const curActionWidget = computed(() => {
    if (activeWidgetIndex.value === null) {
      return null
    }
    return widgetList.value[activeWidgetIndex.value]
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

  const findChildren = (_key: string) => {
    return findDeepItem<IFormComp>(widgetList.value, ({ key }) => key === _key)
  }

  return {
    formOptions,
    widgetList,
    formSimulateData,
    activeWidgetIndex,
    curActionWidget,
    returnFormData,
    changeActiveWidget,
    updateWidgetSimulateValue,
    updateFormOptions,
    updateActionWidgetOptions,
    findChildren,
  }
}

export type ICreateFormGroup = ReturnType<typeof createFormGroup>

export const ProvideFormGroup = Symbol('ProvideFormGroup') as InjectionKey<ICreateFormGroup>
