/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-16 16:41:07
 */
import type { ITemplateOptions } from '@corgi-icode/core'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const useEnv = ref('normal')

export const localTemplateList = useLocalStorage<ITemplateOptions[]>(
  'templateList',
  [],
)

export function getTemplateList(TemplateList: ITemplateOptions[]) {
  return computed(() => {
    return [...TemplateList, ...localTemplateList.value]
  })
}
