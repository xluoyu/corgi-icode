<template>
  <el-card
    :style="{ '--el-card-bg-color': background, '--el-card-padding': '6px' }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <span class="pl-1">{{ title }}</span>
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
    </template>
    <el-collapse-transition v-if="!collapseStatus && collapse">
      <DraggableArea :list="item.children" class="min-h-[60px]">
        <template #default="{ item:_item }">
          <RenderComp :item="_item" />
        </template>
      </DraggableArea>
    </el-collapse-transition>

    <DraggableArea
      v-if="!collapse"
      :list="item.children"
      class="min-h-[60px]"
    >
      <template #default="{ item:_item }">
        <RenderComp :item="_item" />
      </template>
    </DraggableArea>
  </el-card>
</template>

<script lang="ts" setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import type { IWidgetItem } from '@/core'
defineProps<{
  title: string
  collapse: boolean
  background: string
  item: IWidgetItem
}>()

const collapseStatus = ref(false)
</script>

<style scoped>
.el-card__header {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
