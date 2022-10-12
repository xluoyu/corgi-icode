<!--
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-12 16:20:27
-->
<template>
  <el-card
    :style="{ '--el-card-bg-color': background, '--el-card-padding': '10px', 'margin-bottom': '20px'}"
  >
    <template #header>
      <slot name="header">
        <div class="flex justify-between items-center">
          <span class="pl-1">{{ header }}</span>
          <el-button
            v-if="collapse"
            class="button"
            text
            @click="collapseStatus = !collapseStatus"
          >
            <el-icon>
              <ArrowDown v-if="collapseStatus" />
              <ArrowUp v-else />
            </el-icon>
            <span>{{ collapseStatus ? '展开' : '收起' }}</span>
          </el-button>
        </div>
      </slot>
    </template>
    <el-collapse-transition v-if="collapse">
      <DraggableArea v-if="collapseStatus" :list="item.children" :item-key="item.key">
        <template #default="{ item:_item }">
          <RenderComp :item="_item" />
        </template>
      </DraggableArea>
    </el-collapse-transition>

    <DraggableArea
      v-else
      :list="item.children"
      :item-key="item.key"
    >
      <template #default="{ item:_item }">
        <RenderComp :item="_item" />
      </template>
    </DraggableArea>
  </el-card>
</template>

<script lang="ts" setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import type { IWidgetItem } from '@corgi-icode/core'
defineProps<{
  header: string
  collapse: boolean
  background: string
  item: IWidgetItem
}>()

const collapseStatus = ref(true)
</script>
