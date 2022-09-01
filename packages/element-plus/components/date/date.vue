<template>
  <el-form-item :label="label" :prop="_key">
    <el-date-picker
      v-bind="$attrs"
      :key="uid"
      v-model="value"
      :type="type"
      :format="format"
      @change="changeValue"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value?: string | number
  _key?: string
  type: string
  format: string
  label: string
}>()
const uid = ref(new Date().getTime())

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string) => {
  emits('update', { key: props._key, value: val })
}

watch(
  () => props.type,
  () => {
    uid.value = new Date().getTime()
  },
)
</script>
