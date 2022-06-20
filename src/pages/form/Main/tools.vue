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
</template>

<script lang='ts' setup>
import { ProvideFormGroup } from '@/composables/designer';
import { ElementPlus, View } from '@element-plus/icons-vue'
const formGroup = inject(ProvideFormGroup)!

const view = () => {
  const data = formGroup.returnFormData()
  console.log(data)
}
</script>
