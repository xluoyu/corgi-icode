<template>
  <el-aside class="bg-$theme-bg w-1/6 px-4">
    <el-tabs v-model="activeTab" tab-position="top" class="h-full">
      <el-tab-pane v-if="curActionWidget" :label="$t('page.componentConfig')" name="comp">
        <keep-alive>
          <RenderForm :key="curActionWidget.key" :form-options="formOptionsToArray(curActionWidget.form)" :form-data="curActionWidget.form" @update="updateActionWidgetOptions" />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :label="$t('page.formConfig')" name="form">
        <RenderForm :form-options="formOptionsToArray(formOptions)" @update="updateFormOptions" />
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script lang='ts' setup>
import RenderForm from './components/renderForm.vue'
import { ProvideFormGroup } from '@/composables/designer'
import type { IFormItemOptions } from '@/enum/form/type'

const formGroup = inject(ProvideFormGroup)!
const { curActionWidget, formOptions, updateFormOptions, updateActionWidgetOptions } = formGroup

const formOptionsToArray = (formOptions: IFormItemOptions) => {
  const arr = []
  for (const key in formOptions) {
    arr.push({
      key,
      ...formOptions[key],
    })
  }
  return arr
}

const activeTab = ref('form')
watch(() => curActionWidget.value?.key, (val) => {
  if (val) {
    activeTab.value = 'comp'
  } else {
    activeTab.value = 'form'
  }
})
</script>
