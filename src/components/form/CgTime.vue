<template>
  <el-time-picker v-bind="$attrs" :key="uid" v-model="value" :is-range="isRange" @change="changeValue" />
</template>

<script lang='ts' setup>
const props = defineProps<{
  value?: string | number
  _key?: string
  isRange: boolean
}>()
const uid = ref(new Date().getTime())

watch(() => props.isRange, () => {
  console.log('change isRange')
  uid.value = new Date().getTime()
})

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string) => {
  emits('update', { key: props._key, value: val })
}
</script>
