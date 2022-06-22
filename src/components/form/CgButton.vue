<template>
  <el-button v-bind="$attrs" :style="{display: inline ? 'inline-flex' : 'flex'}">
    {{ content }}
  </el-button>
</template>

<script lang='ts' setup>
defineProps<{
  content: string
  inline: boolean
}>()
</script>
