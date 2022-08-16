import type { ITemplateOptions } from '../type'

export const localTemplateList = useLocalStorage<ITemplateOptions[]>(
  'templateList',
  [],
)

export function getTemplateList(TemplateList: ITemplateOptions[]) {
  return computed(() => {
    return [...TemplateList, ...localTemplateList.value]
  })
}
