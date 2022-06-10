<template>
  <el-aside class="bg-$theme-bg w-1/6 px-4">
    <el-tabs tab-position="top" class="h-full">
      <el-tab-pane v-if="curActionComp" :label="$t('page.componentConfig')">
        <el-form>
          <el-form-item v-for="item in curActionComp.form" :key="item.key" />
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('page.formConfig')">
        Config
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script lang='ts' setup>
import { ProvideFormGroup } from '@/composables/designer'

const formGroup = inject(ProvideFormGroup)!
const { widgetList, activeWidgetIndex } = formGroup
const curActionComp = computed(() => {
  if (activeWidgetIndex.value === null) {
    return null
  }
  return widgetList.value[activeWidgetIndex.value]
})
</script>
