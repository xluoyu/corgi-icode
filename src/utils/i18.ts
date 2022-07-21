import { createI18n } from 'vue-i18n'
import { ILocale, locale } from '@/composables'
import zh from '@/lang/zh-CN'
import en from '@/lang/en-US'

const i18n = createI18n({
  locale: locale.value || ILocale.zhCN,
  messages: {
    [ILocale.zhCN]: zh,
    [ILocale.enUS]: en,
  },
})

export default i18n
