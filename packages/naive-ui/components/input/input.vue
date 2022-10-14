<!--
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 10:15:48
-->
<template>
  <n-form-item :label="label" :prop="_key">
    <n-input
      v-model="value"
      :type="type"
      v-bind="$attrs"
      @change="changeValue"
    />
  </n-form-item>
</template>

<script lang="ts" setup>
import { NFormItem, NInput } from 'naive-ui'
const props = defineProps<{
  type?: 'textarea' | 'text' | 'password' | undefined
  value?: string | number
  _key?: string
  label: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string | number) => {
  emits('update', { key: props._key, value: val })
}
</script>
