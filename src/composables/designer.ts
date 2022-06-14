import type { InjectionKey } from 'vue'
import { FormOptions } from '@/enum/form'
import type { IFormComp } from '@/enum/form/type'

export function createFormGroup() {
  const formOptions = ref(FormOptions)
  const widgetList = ref<IFormComp[]>([])
  const activeWidgetIndex = ref<number | null>(null)

  const changeActiveWidget = (index: number) => {
    activeWidgetIndex.value = index
  }

  const formData = reactive<Record<string, any>>({})
  watch(() => widgetList.value, () => {
    widgetList.value.forEach((item) => {
      const key = item.form.find(e => e.key === '_key').value
      formData[key] = formData[key] || ''
    })
  })

  return {
    formOptions,
    widgetList,
    formData,
    activeWidgetIndex,
    // addWidget,
    changeActiveWidget,
  }
}

export type ICreateFormGroup = ReturnType<typeof createFormGroup>

export const ProvideFormGroup = Symbol('ProvideFormGroup') as InjectionKey<ICreateFormGroup>
