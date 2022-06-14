<template>
  <el-form-item :label="label" :prop="_key">
    <el-input v-model="value" :type="type" :placeholder="placeholder" />
  </el-form-item>
</template>

<script lang='ts' setup>
const props = defineProps<{
  label: string
  type: string
  value?: string
  _key?: string
  placeholder?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  emits('update', { key: props._key, value: val })
})
</script>
