<template>
  <el-row>
    <cg-col v-for="_item in children" :key="_item.key" :item="_item" />
  </el-row>
</template>

<script lang="ts" setup>
import type { IWidgetItem } from '@/core'
import { cloneNewWidget, curCloneWidgetKey } from '@/core'
import colOptions from '@/enum/form/col'
const props = defineProps<{
  item: IWidgetItem
}>()

const showType = inject('showType')

const children = props.item.children

onMounted(() => {
  if (showType === 'whiteboard') {
    props.item.children!.push(
      Object.assign(cloneNewWidget(colOptions), { parent: props.item.key }),
      Object.assign(cloneNewWidget(colOptions), { parent: props.item.key }),
    )

    // 将活跃节点的key锁定为grid
    curCloneWidgetKey.value = props.item.key
  }
})
</script>
