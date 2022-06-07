<template>
  <div class="flex-1 h-full">
    <Tools />
    <el-scrollbar class="overflow-auto !h-[calc(100%-var(--header-h))]">
      <Whiteboard />
    </el-scrollbar>
  </div>
</template>

<script lang='ts' setup>
import Whiteboard from './whiteboard.vue'
import Tools from './tools.vue'
</script>
