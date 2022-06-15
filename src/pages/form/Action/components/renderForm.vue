<template>
  <el-form>
    <Component :is="'cg-' + item.comp" v-bind="item" v-for="item, i in renderList" :key="item.key" @update="(data: any) => emits('update', data, i)" />
  </el-form>
</template>

<script lang='ts' setup>
import CompConfig from '@/enum/form/CompConfig'
import type { IFormItemOptions } from '@/enum/form/type'

const props = defineProps<{
  formOptions: IFormItemOptions[]
}>()

const renderList = computed(() => {
  return props.formOptions.map((item) => {
    return {
      ...CompConfig[item.type],
      ...item,
    }
  })
})

const emits = defineEmits(['update'])
</script>
