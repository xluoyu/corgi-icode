<template>
  <div
    id="whiteboard"
    class="h-800px m-8 p-4 relative bg-$theme-bg .dark:bg-dark-300"
  >
    <DraggableArea :list="widgetList" empty="请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处.">
      <template #default="{ item }">
        <RenderComp :item="item" />
      </template>
    </DraggableArea>
  </div>
</template>

<script lang="ts" setup>
import { widgetList } from '@/core'

provide('showType', 'whiteboard') // 显示状态为白板
provide('formData', null)
// const { TestFn } = getCurrentInstance()?.proxy
// TestFn()
// console.log(TestFn)
</script>
