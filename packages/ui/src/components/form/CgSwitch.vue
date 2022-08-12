<template>
  <el-switch v-model="value" v-bind="$attrs" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  value?: boolean | string
  _key?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  emits('update', { key: props._key, value: val })
})
</script>
