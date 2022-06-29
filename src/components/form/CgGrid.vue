<template>
  <el-row>
    <cg-col v-for="item in children" :key="item.key" :item="item" />
  </el-row>
</template>

<script lang='ts' setup>
import { ProvideFormGroup, addNewWidget } from '@/composables/designer'
import colOptions from '@/enum/form/col'
const props = defineProps<{
  itemKey: string
}>()

const formGroup = inject(ProvideFormGroup)!
const showType = inject('showType')

const { children } = formGroup.findWidgetItem(props.itemKey)!

onMounted(() => {
  if (showType === 'whiteboard') {
    children!.push(
      Object.assign(addNewWidget(colOptions), { parent: props.itemKey }),
      Object.assign(addNewWidget(colOptions), { parent: props.itemKey }),
    )
  }
})

</script>
