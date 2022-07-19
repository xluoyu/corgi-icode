<template>
  <el-select
    v-bind="$attrs"
    :key="uid"
    v-model="value"
    :multiple="multiple"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script lang='ts' setup>
const props = defineProps<{
  _key?: string
  value?: string | string[] | null
  multiple?: boolean
  options?: { label: string; value: string | number }[]
}>()

const uid = ref(new Date().getTime())

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  emits('update', { key: props._key, value: val })
})

// 切换回更改value的属性时，需要重新加载本组件
watch(() => props.multiple, (val) => {
  value.value = null
  uid.value = new Date().getTime()
})
</script>
