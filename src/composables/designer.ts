import type { InjectionKey } from 'vue'
import { FormOptions } from '@/enum/form'
import type { IFormComp } from '@/enum/form/type'

export function createFormGroup() {
  /**
   * 当前的form配置
   */
  const formOptions = ref(FormOptions)
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
  const formSimulateData = computed(() => {
    return widgetList.value.reduce((pre, item) => {
      const key = item.form.find(e => e.key === '_key').value
      pre[key] = item.value || ''
      return pre
    }, {} as Record<string, any>)
  })

  /**
   * 更新组件的模拟value
   * @param param0
   */
  const updateWidgetSimulateValue = ({ key, value }: { key: string; value: any }) => {
    console.log(key, value)
    widgetList.value.find(e => e.key === key)!.value = value
  }

  /**
   * 更新form配置
   * @param param0
   * @param index
   */
  const updateFormOptions = ({ value }: { key: string; value: any }, index: number) => {
    formOptions.value[index].value = value
  }

  const updateActionWidgetOptions = ({ value }: { key: string; value: any }, index: number) => {
    curActionWidget.value!.form[index].value = value
  }

  return {
    formOptions,
    widgetList,
    formSimulateData,
    activeWidgetIndex,
    curActionWidget,
    changeActiveWidget,
    updateWidgetSimulateValue,
    updateFormOptions,
    updateActionWidgetOptions,
  }
}

export type ICreateFormGroup = ReturnType<typeof createFormGroup>

export const ProvideFormGroup = Symbol('ProvideFormGroup') as InjectionKey<ICreateFormGroup>
