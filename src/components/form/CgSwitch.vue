<template>
  <el-form-item :label="label">
    <el-switch v-model="value" :active-value="activeValue" :inactive-value="inactiveValue" />
  </el-form-item>
</template>

<script lang='ts' setup>
const props = defineProps<{
  label: string
  value?: boolean
  _key?: string
  activeValue?: string
  inactiveValue?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  emits('update', { key: props._key, value: val })
})
</script>
