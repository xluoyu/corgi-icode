<template>
  <div :class="cls" @click="activeCurComp">
    <slot />
    <div class="action-area" />
  </div>
</template>

<script lang='ts' setup>
import type { ICreateFormGroup } from '@/composables/designer'
import type { IFormComp } from '@/enum/form/type'

const props = defineProps<{
  item: IFormComp
  index: number
  formGroup: ICreateFormGroup
}>()

const activeCurComp = () => {
  props.formGroup.changeActiveWidget(props.index)
}

const cls = computed(() => [
  'handle-comp',
  { 'handle-comp--active': props.formGroup.activeWidgetIndex.value === props.index },
])
</script>
