<template>
  <div
    :style="{
      display: block ? 'block' : 'inline-block',
      fontSize: `var(--el-font-size-${size})`
    }"
  >
    {{ value }}
  </div>
</template>

<script lang='ts' setup>
defineProps<{
  value?: string
  size: string
  block: boolean
}>()
</script>
