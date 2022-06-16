<template>
  <el-form label-width="auto" size="small">
    <template v-for="item, i in renderList" :key="item.key">
      <Component :is="'cg-' + item.comp" v-bind="item" @update="(data: any) => emits('update', data, i)" />
    </template>
  </el-form>
</template>

<script lang='ts' setup>
import CompConfig from '@/enum/form/CompConfig'
import type { IFormItemOptionsArray } from '@/enum/form/type'

const props = defineProps<{
  formOptions: IFormItemOptionsArray
}>()

const renderList = computed(() => {
  const res = props.formOptions.map((item) => {
    return {
      ...CompConfig[item.type],
      ...item,
      _key: item.key,
    }
  })
  return res
})

const emits = defineEmits(['update'])
onBeforeMount(() => {
  console.time('renderForm')
})
onMounted(() => {
  console.timeEnd('renderForm')
})
</script>
