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
import type { IFormComp } from '@/enum/form/type'

const props = defineProps<{
  itemKey?: string
  list: IFormComp[]
}>()

const showType = inject('showType')

// 为了阻止vue的warn信息
// provide('formData', null)

const addEnd = () => {
  addNewWidget(props.itemKey)
}
</script>
