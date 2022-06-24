<template>
  <el-row>
    <draggable :list="children" item-key="key" group="dragGroup" class="w-full min-h-[40px]" @add="addEnd">
      <template #item="{ element, index }">
        <el-col :span="24">
          <HandleComp :item="element" :index="index" :form-group="formGroup">
            <RenderComp :item="element" @update="(data) => updateWidgetSimulateValue({key: data.key, value: data.value})" />
          </HandleComp>
        </el-col>
      </template>
    </draggable>
  </el-row>
</template>

<script lang='ts' setup>
import Draggable from 'vuedraggable'
import { ProvideFormGroup } from '@/composables/designer'
import HandleComp from '@/pages/form/Main/handleComp.vue'
import RenderComp from '@/pages/form/Main/renderComp.vue'
const props = defineProps<{
  itemKey: string
}>()

const formGroup = inject(ProvideFormGroup)!
const { updateWidgetSimulateValue } = formGroup

const { children } = formGroup.findChildren(props.itemKey)!

</script>
