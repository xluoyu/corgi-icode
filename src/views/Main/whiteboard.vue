<template>
  <DraggableArea
    :list="widgetList"
    class="min-h-800px m-8 p-4 relative bg-$theme-bg .dark:bg-dark-300"
    empty="请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处."
  >
    <template #default="{ item }">
      <RenderComp :item="item" />
    </template>
  </DraggableArea>
</template>

<script lang="ts" setup>
import { removeActionWidget, widgetList } from '@/core'

provide('showType', 'whiteboard') // 显示状态为白板
provide('formData', null)

document.addEventListener('keydown', (event) => {
  const keyName = event.key

  if (keyName === 'Delete') {
    removeActionWidget()
  }
})
</script>
