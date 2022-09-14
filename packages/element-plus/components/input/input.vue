<!--
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 10:15:48
-->
<template>
  <el-form-item :label="label" :prop="_key">
    <el-input
      v-model="value"
      :type="type"
      v-bind="$attrs"
      @change="changeValue"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  type?: string
  value?: string | number
  _key?: string
  label: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string | number) => {
  val = props.type === 'number' ? Number(val) : val
  emits('update', { key: props._key, value: val })
}
</script>
