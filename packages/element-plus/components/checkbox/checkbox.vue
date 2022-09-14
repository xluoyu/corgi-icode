<template>
  <el-form-item :label="label" :prop="_key">
    <el-checkbox-group v-model="value" @change="changeValue">
      <el-checkbox v-for="item in options" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value?: string
  _key?: string
  label: string
  options?: { label: string; value: string | number }[]
}>()

const emits = defineEmits(['update'])

const value = ref(props.value?.split(','))
const changeValue = (val: any[]) => {
  emits('update', { key: props._key, value: val.join(',') })
}
</script>
