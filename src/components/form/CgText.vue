<template>
  <div
    :style="{
      display: block ? 'block' : 'inline-block',
      fontSize: `var(--el-font-size-${size})`
    }"
  >
    {{ content }}
  </div>
</template>

<script lang='ts' setup>
defineProps<{
  content?: string
  size: string
  block: boolean
}>()
</script>
