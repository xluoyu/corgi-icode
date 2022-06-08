<template>
  <div class="h-8 px-4 flex items-center justify-between bg-$theme-bg border-x border-b border-gray-400">
    <div />
    <el-space>
      <el-link type="primary" :icon="View">
        预览
      </el-link>
      <el-link type="primary" :icon="ElementPlus">
        生成代码
      </el-link>
    </el-space>
  </div>
</template>

<script lang='ts' setup>
import { ElementPlus, View } from '@element-plus/icons-vue'
</script>
