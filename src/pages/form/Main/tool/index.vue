<template>
  <div class="h-8 px-4 flex items-center justify-between bg-$theme-bg border-x border-b border-gray-400">
    <div />
    <el-space>
      <el-link type="primary" :icon="View" @click="view">
        {{ $t('page.view') }}
      </el-link>
      <el-link type="primary" :icon="ElementPlus" @click="render">
        {{ $t('page.renderCode') }}
      </el-link>
    </el-space>
  </div>
  <Preview ref="previewDialog" />
  <RenderCode ref="renderCodeDialog" />
</template>

<script lang='ts' setup>
import { ElementPlus, View } from '@element-plus/icons-vue'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Preview from './preview.vue'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RenderCode from './renderCode.vue'
import { ProvideFormGroup } from '@/composables/designer'
const formGroup = inject(ProvideFormGroup)!
const previewDialog = ref<InstanceType<typeof Preview> | null>(null)
const renderCodeDialog = ref<InstanceType<typeof RenderCode> | null>(null)
const view = () => {
  const data = formGroup.returnFormData()
  previewDialog.value!.open(data)
}
const render = () => {
  const data = formGroup.returnFormData()
  renderCodeDialog.value!.open(data)
}
</script>
