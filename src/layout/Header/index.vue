<template>
  <el-header class="h-$header-h bg-$theme-bg border-b border-gray-400 z-10 relative">
    <el-row class="h-full" align="middle">
      <el-col :span="8" />
      <el-col :span="8" class="text-center">
        <el-button type="primary" text class="text-base">
          {{ $t('form') }}
        </el-button>
        <el-divider direction="vertical" />
        <el-button type="success" text class="text-base">
          {{ $t('table') }}
        </el-button>
      </el-col>
      <el-col :span="8" class="flex items-center justify-end">
        <el-icon class="cursor-pointer mr-4" :size="20" @click="toggleDark()">
          <i-ep-moon v-show="isDark" />
          <i-ep-sunny v-show="!isDark" />
        </el-icon>
        <el-dropdown @command="handleCommand">
          <el-icon :size="20">
            <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-dd9c9540=""><path fill="currentColor" d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z" /></svg>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="zh-CN">
                简体中文
              </el-dropdown-item>
              <el-dropdown-item command="en-US">
                English
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import type { ILocale } from '@/composables'
import { isDark, locale, toggleDark } from '@/composables'
const { locale: curLocale } = useI18n()
const handleCommand = (command: ILocale) => {
  locale.value = command
  curLocale.value = command
}
</script>
