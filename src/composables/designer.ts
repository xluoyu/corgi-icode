import type { InjectionKey } from 'vue'
import { formData } from '@/enum/form'
import type { IFormComp } from '@/enum/form/type'

export function createFormGroup() {
  const formOptions = ref(formData)
  const widgetList = ref<IFormComp[]>([])
  const activeWidgetIndex = ref<number | null>(null)

  // const addWidget = (newIndex: number, groupName: string) => {
  //   const newWidget = FormCompList.find(e => e.title === groupName)?.children[newIndex]
  //   if (!newWidget)
  //     return

  //   widgetList.value.push(newWidget)
  // }

  const changeActiveWidget = (index: number) => {
    activeWidgetIndex.value = index
  }

  return {
    formOptions,
    widgetList,
    activeWidgetIndex,
    // addWidget,
    changeActiveWidget,
  }
}

export type ICreateFormGroup = ReturnType<typeof createFormGroup>

export const ProvideFormGroup = Symbol('ProvideFormGroup') as InjectionKey<ICreateFormGroup>
