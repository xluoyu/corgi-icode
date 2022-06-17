<template>
  <el-form-item :label="options.label" :prop="options._key">
    <component :is="item.component" :key="options._key" v-bind="options" @update="(data: string | number) => emits('update', data)" />
  </el-form-item>
</template>

<script lang='ts' setup>
import type { IFormComp } from '@/enum/form/type'

const props = defineProps<{
  item: IFormComp
}>()

const options = computed(() => Object.keys(props.item.form).reduce((pre, key) => {
  pre[key] = props.item.form[key].value
  return pre
}, {} as Record<string, any>),
)

const emits = defineEmits(['update'])
</script>
