<template>
  <el-form-item :label="label">
    <el-select v-model="value">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<script lang='ts' setup>
const props = defineProps<{
  label: string
  value?: string
  options?: { label: string; value: string | number }[]
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  emits('update', val)
})
</script>
