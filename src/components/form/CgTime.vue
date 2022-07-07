<template>
  <el-time-picker v-bind="$attrs" :key="uid" v-model="value" :is-range="isRange" @change="changeValue" />
</template>

<script lang='ts' setup>
const props = defineProps<{
  value?: any
  _key?: string
  isRange: boolean
}>()
const uid = ref(new Date().getTime())

watch(() => props.isRange, () => {
  console.log('change isRange')
  uid.value = new Date().getTime()
})

const emits = defineEmits(['update'])

const value = ref(props.isRange ? props.value.split(',') : props.value)
const changeValue = (val: any) => {
  emits('update', { key: props._key, value: props.isRange ? val.join(',') : val })
}
</script>
