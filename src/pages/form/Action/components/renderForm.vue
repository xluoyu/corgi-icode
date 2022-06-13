<template>
  <el-form>
    <Component :is="'cg-' + item.type" v-bind="item" v-for="item, i in formOptions" :key="item.key" @update="(value: string | number) => emits('update', {...item, value}, i)" />
  </el-form>
</template>

<script lang='ts' setup>
defineProps<{
  formOptions: any
}>()

const emits = defineEmits(['update'])
</script>
