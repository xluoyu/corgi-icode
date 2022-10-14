<template>
  <el-form-item :label="label" :prop="_key">
    <el-select v-bind="$attrs" :key="uid" v-model="value" :multiple="multiple">
      <el-option
        v-for="item in _options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  _key?: string
  value?: string | string[] | null
  label: string
  multiple?: boolean
  options?: Record<string, string>
}>()

const uid = ref(new Date().getTime())

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  console.log(val)
  emits('update', { key: props._key, value: val })
})

const _options = computed(() => {
  if (!props.options)
    return []
  return Object.keys(props.options).map((key) => {
    return {
      label: key,
      value: props.options![key],
    }
  })
})

// 切换回更改value的属性时，需要重新加载本组件
watch(
  () => props.multiple,
  (val) => {
    value.value = null
    uid.value = new Date().getTime()
  },
)
</script>
