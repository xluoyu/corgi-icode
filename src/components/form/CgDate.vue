<template>
  <el-date-picker
    v-bind="$attrs"
    :key="uid"
    v-model="value"
    :type="type"
    :format="format"
    @change="changeValue"
  />
</template>

<script lang='ts' setup>
const props = defineProps<{
  value?: string | number
  _key?: string
  type: string
  format: string
}>()
const uid = ref(new Date().getTime())

watch(() => props.type, () => {
  uid.value = new Date().getTime()
})

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string) => {
  emits('update', { key: props._key, value: val })
}
</script>
