<template>
  <div class="h-full w-[calc(100vw-600px)] !min-w-[700px] overflow-hidden">
    <Tools />

    <el-scrollbar class="overflow-auto !h-[calc(100%-2rem)]">
      <Whiteboard />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Whiteboard from './whiteboard.vue'
import Tools from './tool/index.vue'
</script>
