<template>
  <el-row>
    <element-plus-col v-for="_item in children" :key="_item.key" :item="_item" />
  </el-row>
</template>

<script lang="ts" setup>
import type { IWidgetItemOmitComponent } from '@corgi-icode/core'
import { cloneNewWidget, curCloneWidgetKey } from '@corgi-icode/core'
import colOptions from '../col/options'
const props = defineProps<{
  item: IWidgetItemOmitComponent
}>()

const showType = inject('showType')

const children = props.item.children

onMounted(() => {
  if (showType === 'whiteboard' && !props.item.children!.length) {
    props.item.children!.push(
      Object.assign(cloneNewWidget(colOptions), { parent: props.item.key }),
      Object.assign(cloneNewWidget(colOptions), { parent: props.item.key }),
    )
    // 将活跃节点的key锁定为grid
    curCloneWidgetKey.value = props.item.key
  }
})
</script>
