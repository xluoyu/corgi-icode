<template>
  <el-input
    v-model="value"
    :type="type"
    v-bind="$attrs"
    @change="changeValue"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  type?: string
  value?: string | number
  _key?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string | number) => {
  val = props.type === 'number' ? Number(val) : val
  emits('update', { key: props._key, value: val })
}
</script>
