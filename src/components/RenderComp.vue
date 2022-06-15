<template>
  <component :is="item.component" v-bind="options" @update="(data: string | number) => emits('update', data)" />
</template>

<script lang='ts' setup>
import type { IFormComp } from '@/enum/form/type'

const props = defineProps<{
  item: IFormComp
}>()

const options = computed(() => props.item.form.reduce((pre, cur) => {
  pre[cur.key] = cur.value
  return pre
}, {} as Record<string, any>),
)

const emits = defineEmits(['update'])
</script>
