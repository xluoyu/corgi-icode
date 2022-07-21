import type { ITemplateOptions } from '@/enum/form/type'

const localTemplateList = useLocalStorage<ITemplateOptions[]>(
  'templateList',
  [],
)

export function getTemplateList(TemplateList: ITemplateOptions[]) {
  return computed(() => {
    return [...TemplateList, ...localTemplateList.value]
  })
}
