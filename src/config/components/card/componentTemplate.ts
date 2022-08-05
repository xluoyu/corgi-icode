export default `
<template>
  <el-card
    :style="{ '--el-card-bg-color': background, '--el-card-padding': '10px' }"
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
    <el-collapse-transition v-if="collapse">
      <slot />
    </el-collapse-transition>

    <slot v-else/>
  </el-card>
</template>

<script setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

defineProps({
  title: string,
  collapse: boolean,
  background: string
})

const collapseStatus = ref(true)
</script>
`
