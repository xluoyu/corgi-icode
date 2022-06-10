<template>
  <el-form-item :label="label">
    <el-select>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>

<script lang='ts' setup>
defineProps<{
  label: string
  options: {
    label: string
    value: string
  }[]
  _key: string
}>()
</script>
