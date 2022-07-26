<template>
  <draggable
    :list="list"
    handle=".moveArea"
    item-key="key"
    group="dragGroup"
    class="w-full h-full"
    @add="addEnd"
  >
    <template #item="{ element }">
      <HandleComp :item="element">
        <slot :item="element" />
      </HandleComp>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { addNewWidget } from '../app'
import type { IFormComp } from '@/enum/form/type'

const props = defineProps<{
  itemKey?: string
  list: IFormComp[]
}>()

// 为了阻止vue的warn信息
// provide('formData', null)

const addEnd = () => {
  addNewWidget(props.itemKey)
}
</script>
