<template>
  <el-divider v-bind="$attrs">
    {{ content }}
  </el-divider>
</template>

<script lang="ts" setup>
defineProps<{
  content: string
}>()
</script>
