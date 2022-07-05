<template>
  <el-date-picker
    v-model="value"
    v-bind="$attrs"
    @change="changeValue"
  />
</template>

<script lang='ts' setup>
const props = defineProps<{
  value?: string | number
  _key?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string) => {
  emits('update', { key: props._key, value: val })
}
</script>
