<template>
  <el-form-item :label="label" :prop="_key">
    <el-time-picker
      v-bind="$attrs"
      :key="uid"
      v-model="value"
      :is-range="isRange"
      @change="changeValue"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value?: any
  _key?: string
  isRange: boolean
  label: string
}>()
const uid = ref(new Date().getTime())

watch(
  () => props.isRange,
  () => {
    uid.value = new Date().getTime()
  },
)

const emits = defineEmits(['update'])

const value = ref(props.isRange ? props.value.split(',') : props.value)
const changeValue = (val: any) => {
  emits('update', {
    key: props._key,
    value: props.isRange ? val.join(',') : val,
  })
}
</script>
