<template>
  <el-form-item :label="label" :prop="_key">
    <el-color-picker v-model="value" v-bind="$attrs" @change="changeValue" />
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value?: string
  _key?: string
  label: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string) => {
  emits('update', { key: props._key, value: val })
}
</script>
