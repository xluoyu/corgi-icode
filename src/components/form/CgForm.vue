<template>
  <el-form :model="formData" class="w-full h-full" v-bind="formAttrs">
    <DraggableArea :list="item.children" class="min-h-[50px]" @add="addEnd">
      <template #default="{item}">
        <component
          :is="item.component"
          v-if="item.noForm"
          :key="options._key"
          :item-key="item.key"
          v-bind="options"
          @update="updateWidgetSimulateValue"
        />
        <el-form-item v-else :label="options.label" :prop="options._key">
          <component
            :is="item.component"
            :key="options._key"
            v-bind="options"
            @update="update"
          />
        </el-form-item>
      </template>
    </DraggableArea>
  </el-form>
</template>

<script lang='ts' setup>

</script>
