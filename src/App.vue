<template>
  <el-config-provider :locale="useLocale">
    <router-view />
  </el-config-provider>
</template>

<script lang='ts' setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { ILocal, locale } from '@/composables'

const localeMap = {
  [ILocal.CN]: zhCn,
  [ILocal.EN]: en,
}

const useLocale = computed(() => localeMap[locale.value])
</script>
