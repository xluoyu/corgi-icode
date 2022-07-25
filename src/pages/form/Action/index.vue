<template>
  <el-aside class="bg-$theme-bg w-1/6 px-4">
    <h3 class="text-base py-2 text-$el-color-primary">
      组件配置
    </h3>
    <keep-alive>
      <RenderForm
        v-if="curActionWidget"
        :key="curActionWidget.key"
      />
      <p v-else>
        暂无选定组件
      </p>
    </keep-alive>
    <!-- <el-tabs v-model="activeTab" tab-position="top" class="h-full">
      <el-tab-pane
        label=""
        name="comp"
      >
      </el-tab-pane>
    </el-tabs> -->
  </el-aside>
</template>

<script lang="ts" setup>
import RenderForm from './components/renderForm.vue'
// import { ProvideFormGroup } from '@/composables/designer'
// import type { IFormItemOptions } from '@/enum/form/type'
import { curActionWidget } from '@/core'

// const curActionWidgetValue = curActionWidget

// const formGroup = inject(ProvideFormGroup)!
// const {
//   curActionWidget,
//   formOptions,
//   updateFormOptions,
//   updateActionWidgetOptions,
// } = formGroup

// const formOptionsToArray = (formOptions: IFormItemOptions) => {
//   const arr = []
//   for (const key in formOptions) {
//     arr.push({
//       key,
//       ...formOptions[key],
//     })
//   }
//   return arr
// }

const activeTab = ref('form')
// watch(
//   () => curActionWidget.value?.key,
//   (val) => {
//     if (val) {
//       activeTab.value = 'comp'
//     } else {
//       activeTab.value = 'form'
//     }
//   },
// )
</script>
