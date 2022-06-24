<template>
  <el-row>
    <draggable :list="list" item-key="key" group="dragGroup" class="w-full min-h-[40px]" @add="addEnd">
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

const list = ref([])

const addEnd = (e: any) => {
}
</script>
