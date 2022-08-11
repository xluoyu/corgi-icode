<template>
  <div class="h-full min-w-[850px]" :style="{width: width + 'px'}">
    <Tools />
    <el-scrollbar class="overflow-auto !h-[calc(100%-2rem)]">
      <Whiteboard />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Whiteboard from './whiteboard.vue'
import Tools from './tool/index.vue'

const width = ref(0)

function setWidth() {
  const menuEl = document.querySelector('#menu')
  const menuWidth = menuEl?.getClientRects()[0].width || 0
  const actionEl = document.querySelector('#action')
  const actionWidth = actionEl?.getClientRects()[0].width || 0
  const windowWidth = window.innerWidth

  width.value = windowWidth - menuWidth - actionWidth
}

window.addEventListener('resize', setWidth)

onMounted(() => {
  setWidth()
})
</script>
