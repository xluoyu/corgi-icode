import { TemplateList } from '@/enum/form'
import { ITemplateOptions } from '@/enum/form/type'

export const localTemplateList = useLocalStorage<ITemplateOptions[]>('templateList', [])

export const templateList = computed(() => {
  return [...TemplateList, ...localTemplateList.value]
})
