<template>
  <el-form-item :label="label" :prop="_key">
    <el-radio-group v-model="value" @change="changeValue">
      <el-radio v-for="item in _options" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value?: string | number
  _key?: string
  options?: Record<string, string>
  label: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string) => {
  emits('update', { key: props._key, value: val })
}

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
</script>
