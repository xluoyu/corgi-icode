<template>
  <el-form-item :label="label" :prop="_key">
    <el-switch v-model="value" v-bind="$attrs" />
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value?: boolean | string
  _key?: string
  label?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  emits('update', { key: props._key, value: val })
})
</script>
