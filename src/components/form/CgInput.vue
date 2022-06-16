<template>
  <el-form-item :label="label" :prop="_key">
    <el-input
      v-model="value"
      :type="type"
      v-bind="$attrs"
      @change="changeValue"
    />
  </el-form-item>
</template>

<script lang='ts' setup>
const props = defineProps<{
  label: string
  type: string
  value?: string
  _key?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string) => {
  emits('update', { key: props._key, value: val })
}
</script>
