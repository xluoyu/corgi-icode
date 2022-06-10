<template>
  <div class="h-8 px-4 flex items-center justify-between bg-$theme-bg border-x border-b border-gray-400">
    <div />
    <el-space>
      <el-link type="primary" :icon="View">
        {{ $t('page.view') }}
      </el-link>
      <el-link type="primary" :icon="ElementPlus">
        {{ $t('page.renderCode') }}
      </el-link>
    </el-space>
  </div>
</template>

<script lang='ts' setup>
import { ElementPlus, View } from '@element-plus/icons-vue'
</script>
