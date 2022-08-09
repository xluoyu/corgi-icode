<template>
  <draggable
    :list="list"
    handle=".moveArea"
    ghost-class="ghostClass"
    item-key="key"
    group="dragGroup"
    @add="addEnd"
  >
    <template v-if="!list.length" #header>
      <div class="text-center opacity-60 h-40 leading-40">
        {{ empty || '拖拽区域' }}
      </div>
    </template>

    <template #item="{ element }">
      <HandleComp v-if="showType === 'whiteboard'" :item="element">
        <slot :item="element" />
      </HandleComp>
      <slot v-else :item="element" />
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { addNewWidget } from '../app'
import type { IWidgetItem } from '../type'

const props = defineProps<{
  empty?: string
  itemKey?: string
  list: IWidgetItem[]
}>()

const showType = inject('showType')

const addEnd = () => {
  addNewWidget(props.itemKey)
}
</script>

<style>
.ghostClass{
  height: 4px;
  background: var(--el-color-primary);
  color: var(--el-color-primary);
  overflow: hidden;
  padding: 0;
  opacity: 0.5;
}
/* .ghostClass *{
  display: none;
} */
</style>
