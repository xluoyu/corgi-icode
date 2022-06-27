<template>
  <el-row>
    <!-- <RenderComp v-for="item in children" :key="item.key" :item="item" /> -->
    <cg-col v-for="item in children" :key="item.key" :item="item" />
  </el-row>
</template>

<script lang='ts' setup>
import { ProvideFormGroup, addNewWidget } from '@/composables/designer'
// import HandleComp from '@/pages/form/Main/handleComp.vue'
// import RenderComp from '@/pages/form/Main/renderComp.vue'
import { colOptions } from '@/enum/form/grid'
const props = defineProps<{
  itemKey: string
}>()

const formGroup = inject(ProvideFormGroup)!
const showType = inject('showType')

const { children } = formGroup.findWidgetItem(props.itemKey)!

onMounted(() => {
  if (showType === 'whiteboard') {
    children.push(addNewWidget(colOptions), addNewWidget(colOptions))
  }
})

</script>
