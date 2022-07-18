<template>
  <draggable :list="list" handle=".handleArea" item-key="key" group="dragGroup" class="w-full h-full" @add="$emit('addEnd')">
    <template #item="{ element }">
      <HandleComp :item="element">
        <RenderComp :item="element" />
      </HandleComp>
    </template>
  </draggable>
</template>

<script lang='ts' setup>
import Draggable from 'vuedraggable'
import type { IFormComp } from '@/enum/form/type'

defineProps<{
  list: IFormComp[]
}>()

defineEmits(['addEnd'])
</script>
