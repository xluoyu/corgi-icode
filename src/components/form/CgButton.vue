<template>
  <el-button v-bind="$attrs">{{content}}</el-button>
</template>

<script lang='ts' setup>
defineProps<{
  content: string
}>()
</script>