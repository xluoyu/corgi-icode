<template>
  <el-config-provider :locale="useLocale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { ILocale, locale } from '@/composables'

const localeMap = {
  [ILocale.zhCN]: zhCn,
  [ILocale.enUS]: en,
}

const useLocale = computed(() => localeMap[locale.value])
</script>
