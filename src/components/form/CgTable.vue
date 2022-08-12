<!--
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-12 15:49:30
-->
<template>
  <el-table
    v-bind="$attrs"
    class="mb-5"
  >
    <el-table-column
      v-for="item in columns"
      :key="item.value"
      :prop="item.value"
      :label="item.label"
      :width="item.width"
    >
      <template v-if="item.slot" #default="{row}">
        <component :is="item.slot" :row="row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
// import type { IWidgetItem } from '@/core'
defineProps<{
  columns: { label: string; prop: string; [x: string]: any }[]
}>()

// const showType = inject('showType')

// onMounted(() => {
//   if (showType === 'whiteboard' && !props.item.children!.length) {
//     props.item.children!.push(
//       Object.assign(cloneNewWidget(colOptions), { parent: props.item.key }),
//       Object.assign(cloneNewWidget(colOptions), { parent: props.item.key }),
//     )
//     // 将活跃节点的key锁定为grid
//     curCloneWidgetKey.value = props.item.key
//   }
// })
</script>
