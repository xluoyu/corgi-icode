<template>
  <el-form-item :label="label">
    <el-input v-model="value" :type="type" />
  </el-form-item>
</template>

<script lang='ts' setup>
defineProps<{
  label: string
  type: string
  _key: string
}>()

const value = ref('')
</script>
