<template>
  <div
    id="whiteboard"
    class="h-800px m-8 p-4 relative bg-$theme-bg .dark:bg-dark-300"
  >
    <p
      v-if="!widgetList.length"
      class="absolute top-1/2 left-0 right-0 mx-auto text-center"
    >
      请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处.
    </p>
    <DraggableArea :list="widgetList">
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

</script>
