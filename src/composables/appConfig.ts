export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export enum ILocale {
  zhCN = 'zh-CN',
  enUS = 'en-US',
}

export const locale = useLocalStorage<ILocale>('locale', ILocale.zhCN)

export const useEnv = ref('normal')
