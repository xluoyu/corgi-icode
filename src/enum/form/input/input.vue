<template>
  <el-form-item :label="label">
    <el-input :type="type" />
  </el-form-item>
</template>

<script lang='ts' setup>
defineProps<{
  label: string
  type: string
  _key: string
}>()
</script>
