<template>
  <el-aside class="bg-$theme-bg w-1/6 px-4">
    <el-tabs tab-position="top" class="h-full">
      <el-tab-pane v-if="curActionWidget" :label="$t('page.componentConfig')" lazy>
        <keep-alive>
          <RenderForm :key="curActionWidget.key" :form-options="curActionWidget.form" @update="updateActionWidgetOptions" />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane :label="$t('page.formConfig')">
        <RenderForm :form-options="formOptions" @update="updateFormOptions" />
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script lang='ts' setup>
import RenderForm from './components/renderForm.vue'
import { ProvideFormGroup } from '@/composables/designer'

const formGroup = inject(ProvideFormGroup)!
const { curActionWidget, formOptions, updateFormOptions, updateActionWidgetOptions } = formGroup
</script>
