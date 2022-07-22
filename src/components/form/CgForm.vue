<template>
  <el-form :model="formData" class="w-full h-full border border-gray-400 border-dashed" v-bind="formAttrs">
    <DraggableArea :list="item.children" class="min-h-[100px]" @add="addEnd">
      <template #default="{ item: _item }">
        <RenderComp :item="_item" />
      </template>
    </DraggableArea>
  </el-form>
</template>

<script lang='ts' setup>
import type { IWidgetItem } from '@/core'
import { addNewWidget, getFormData, mixinValue } from '@/core'

const props = defineProps<{
  item: IWidgetItem
}>()

const formData = reactive({})

watch(() => props.item.children!.length, () => {
  Object.assign(formData, getFormData(props.item.key))
})

provide('formData', {
  updateFormData(data) {
    console.log('update form', data)
    formData[data.key] = data.value
  },
})

const formAttrs = computed(() => {
  return Object.keys(props.item.form).reduce((pre, key) => {
    const value = props.item.form[key].value
    if (key.includes('.') && value) {
      pre = mixinValue(key, value, pre)
    } else {
      /**
       * 表单开启了校验
       */
      // if (key === 'validate' && value) {
      //   pre.rules = getFormValidateRules.value
      // }
      pre[key] = value
    }
    return pre
  }, {} as Record<string, any>)
})

const addEnd = () => {
  addNewWidget(props.item.parent)
}

</script>
