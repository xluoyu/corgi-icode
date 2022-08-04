export default `
<template>
  <el-card
    :style="{ '--el-card-bg-color': background }"
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
      <slot />
    </el-collapse-transition>

    <slot v-else/>
  </el-card>
</template>

<script lang="ts" setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import type { IWidgetItem } from '@/core'
defineProps<{
  title: string
  collapse: boolean
  background: string
}>()

const collapseStatus = ref(false)
</script>

<style>
.el-card__header, .el-card__body {
  padding: 10px;
}
</style>
`
