<template>
  <div class="h-8 px-4 flex items-center justify-between bg-$theme-bg border-x border-b border-gray-400">
    <div />
    <el-space>
      <el-link type="primary" :icon="View" @click="view">
        {{ $t('page.view') }}
      </el-link>
      <el-link type="primary" :icon="ElementPlus">
        {{ $t('page.renderCode') }}
      </el-link>
    </el-space>
  </div>
  <Preview ref="previewDialog" />
</template>

<script lang='ts' setup>
import { ElementPlus, View } from '@element-plus/icons-vue'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Preview from './preview.vue'
import { ProvideFormGroup } from '@/composables/designer'
const formGroup = inject(ProvideFormGroup)!
const previewDialog = ref<InstanceType<typeof Preview> | null>(null)
const view = () => {
  const data = formGroup.returnFormData()
  previewDialog.value!.openPreview(data)
}
</script>
