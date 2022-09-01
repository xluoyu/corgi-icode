<template>
  <el-form-item :label="label" :prop="_key">
  <el-input
    ref="textareaRef"
    v-model="value"
    type="textarea"
    v-bind="$attrs"
    @change="changeValue"
  />
</el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value?: string
  _key?: string
  label: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string) => {
  emits('update', { key: props._key, value: val })
}

const textareaRef = ref<any>(null)
const textareaRefParentWidth = ref(0)

onMounted(() => {
  nextTick(() => {
    textareaRefParentWidth.value = textareaRef.value?.ref.parentNode.offsetWidth || 0
  })
})

</script>

<style>
.el-textarea .el-textarea__inner {
  max-width: v-bind(textareaRefParentWidth + 'px');
}
</style>
