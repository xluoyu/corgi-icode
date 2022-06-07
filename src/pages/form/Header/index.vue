<template>
  <el-header class="h-$header-h bg-$theme-bg border-b z-10 relative flex items-center justify-between">
    <div>
      <el-button type="primary">
        表单
      </el-button>
      <el-button type="primary">
        表格
      </el-button>
    </div>
    <div class="flex items-center">
      <el-icon class="cursor-pointer mr-4" @click="toggleDark()">
        <i-ep-moon v-show="isDark" />
        <i-ep-sunny v-show="!isDark" />
      </el-icon>
      <el-select v-model="locale" class="noBorder w-26">
        <el-option label="简体中文" value="zh-CN" />
        <el-option label="English" value="en-US" />
      </el-select>
    </div>
  </el-header>
</template>

<script lang='ts' setup>
import { isDark, locale, toggleDark } from '@/composables'
</script>
