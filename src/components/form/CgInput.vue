<template>
  <el-form-item :label="label">
    <el-input v-model="value" :type="type" />
  </el-form-item>
</template>

<script lang='ts' setup>
const props = defineProps<{
  label: string
  type: string
  value?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  emits('update', val)
})
</script>
