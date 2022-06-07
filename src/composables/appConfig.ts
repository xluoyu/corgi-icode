export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export enum ILocal {
  CN = 'zh-CN',
  EN = 'en-US',
}
export const locale = useLocalStorage<ILocal>('locale', ILocal.CN)
export const changeLocale = (newLocale: ILocal) => {
  locale.value = newLocale
}
