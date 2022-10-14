<template>
  <n-button
    v-bind="$attrs"
    :style="{ display: inline ? 'inline-flex' : 'flex' }"
  >
    {{ content }}
  </n-button>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'

defineProps<{
  content: string
  inline: boolean
}>()
</script>
