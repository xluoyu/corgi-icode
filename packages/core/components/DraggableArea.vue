<!--
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-12 16:35:28
-->
<template>
  <draggable
    v-if="showType === 'whiteboard'"
    :list="list"
    handle=".moveArea"
    ghost-class="ghostClass"
    item-key="key"
    group="dragGroup"
    @add="addEnd"
  >
    <template v-if="!list.length" #footer>
      <div class="text-center opacity-60 h-40 leading-40">
        {{ empty || '拖拽区域' }}
      </div>
    </template>

    <template #item="{ element }">
      <HandleComp :item="element">
        <slot :item="element" />
      </HandleComp>
    </template>
  </draggable>

  <template v-else>
    <slot v-for="item in list" :item="item" />
  </template>
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
