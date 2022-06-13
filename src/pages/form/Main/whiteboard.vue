<template>
  <div class="h-800px m-8 p-4 bg-$theme-bg .dark:bg-dark-300">
    <el-form class="w-full h-full" v-bind="formAttrs">
      <draggable :list="list" item-key="key" group="dragGroup" class="w-full h-full">
        <template #item="{ element, index }">
          <HandleComp :item="element" :index="index" :form-group="formGroup">
            <RenderComp :item="element" />
          </HandleComp>
        </template>
      </draggable>
    </el-form>
  </div>
</template>

<script lang='ts' setup>
import Draggable from 'vuedraggable'
import HandleComp from './handleComp.vue'
import RenderComp from './renderComp.vue'
import { ProvideFormGroup } from '@/composables/designer'
import { mixinValue } from '@/utils'

const formGroup = inject(ProvideFormGroup)!

const list = toRef(formGroup, 'widgetList')

const formAttrs = computed(() => {
  return formGroup.formOptions.value.reduce((pre, attrItem) => {
    const { key, value } = attrItem

    if (key.includes('.')) {
      mixinValue(key, value, pre)
    } else {
      pre[key] = value
    }
    return pre
  }, {} as Record<string, any>)
})
</script>
