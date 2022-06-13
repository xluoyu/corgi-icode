<template>
  <el-aside class="bg-$theme-bg w-1/6 px-4">
    <el-tabs tab-position="top" class="h-full">
      <el-tab-pane v-if="curActionComp" :label="$t('page.componentConfig')">
        <RenderForm :key="curActionComp.key" :form-options="curActionComp.form" @update="updateActionComp" />
      </el-tab-pane>
      <el-tab-pane :label="$t('page.formConfig')">
        <RenderForm :form-options="formOptions" @update="updateForm" />
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script lang='ts' setup>
import RenderForm from './components/renderForm.vue'
import { ProvideFormGroup } from '@/composables/designer'

const formGroup = inject(ProvideFormGroup)!
const { widgetList, activeWidgetIndex, formOptions } = formGroup
const curActionComp = computed(() => {
  if (activeWidgetIndex.value === null) {
    return null
  }
  return widgetList.value[activeWidgetIndex.value]
})

const updateForm = (item: any, index: number) => {
  formOptions.value[index] = item
}

const updateActionComp = (item: any, index: number) => {
  curActionComp.value!.form[index] = item
}
</script>
