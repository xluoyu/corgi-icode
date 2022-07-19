<template>
  <el-input
    ref="textareaRef"
    v-model="value"
    type="textarea"
    v-bind="$attrs"
    @change="changeValue"
  />
</template>

<script lang='ts' setup>
const props = defineProps<{
  value?: string
  _key?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
const changeValue = (val: string) => {
  emits('update', { key: props._key, value: val })
}

const textareaRef = ref<any>(null)
const textareaRefWidth = computed(() => `${textareaRef.value?.ref.parentNode.offsetWidth}px` || '0px')
</script>

<style>
.el-textarea .el-textarea__inner{
  max-width: v-bind(textareaRefWidth);
}
</style>
