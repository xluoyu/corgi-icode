<!--
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-12 15:49:30
-->
<template>
  <el-table
    v-bind="$attrs"
    ref="tableRef"
    class="mb-5"
    :data="data"
    :stripe="stripe"
    :border="border"
  >
    <el-table-column
      v-for="item in tableColumns"
      :key="item.label"
      :prop="typeof item.value === 'function' ? '' : item.value"
      :label="item.label"
    >
      <template v-if="typeof item.value === 'function'" #default="{row, $index, column}">
        <component :is="item.value" :row="row" :$index="$index" :column="column" />
      </template>
    </el-table-column>
  </el-table>

  <el-pagination v-if="hasPagination" small background layout="prev, pager, next" :page-size="pageSize" :total="data.length" />
</template>

<script lang="ts" setup>
import type { VNode, VNodeRef } from 'vue'
// import type { IWidgetItem } from '@corgi-icode/core'
const props = defineProps<{
  data: Array<any>
  columns: Record<string, string>
  stripe: boolean
  border: boolean
  hasPagination: boolean
  pageSize: number
}>()

const tableRef = ref<VNodeRef | null>(null)

watch(() => [props.data, props.columns], () => {
  tableRef.value.doLayout()
}, {
  deep: true,
})

const tableColumns = computed(() => {
  return Object.keys(props.columns).map((key) => {
    let value: string | ((arg0: any) => VNode) = props.columns[key]
    // 字符内有参数，用正则做一下替换
    if (value.includes('${')) {
      const reg = /\$\{(.+?)\}/g
      const keyReg = '\\$\\{(.+?)\\}'
      const res = value.match(reg)

      // 这里直接封装成组件的形式，插入到el-table-column的插槽中
      value = function({ row }: any) {
        let valueStr = props.columns[key]
        res?.forEach((str) => {
          const regExp = str.match(keyReg)
          if (regExp) {
            valueStr = valueStr.replace(str, row[regExp[1]])
          }
        })
        return h('span', valueStr)
      }
    }

    return {
      label: key,
      value,
    }
  })
})

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
