<template>
  <draggable
    :list="list"
    handle=".moveArea"
    item-key="key"
    group="dragGroup"
    class="w-full h-full"
    @add="(val) => {$emit('addEnd', val)}"
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
import type { IFormComp } from '@/enum/form/type'

defineProps<{
  list: IFormComp[]
}>()

defineEmits(['addEnd'])

// 为了阻止vue的warn信息
provide('formData', null)

</script>
