<template>
  <el-select
    v-model="value"
    v-bind="$attrs"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script lang='ts' setup>
const props = defineProps<{
  _key?: string
  value?: string
  options?: { label: string; value: string | number }[]
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  emits('update', { key: props._key, value: val })
})
</script>
