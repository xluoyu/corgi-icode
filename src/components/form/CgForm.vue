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
import type { IWidgetItem, objectT } from '@/core'
import { addNewWidget, getFormData, mixinValue } from '@/core'

const props = defineProps<{
  item: IWidgetItem
}>()

const formData = reactive<objectT<any>>({})

function updateFormData() {
  Object.assign(formData, getFormData(props.item.key))
}

// eslint-disable-next-line vue/no-mutating-props
props.item.updateDataFn = updateFormData

watch(() => props.item.children!.length, updateFormData)

provide('formData', {
  updateFormData(data: { key: string | number; value: any }) {
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
  addNewWidget(props.item.key)
}
</script>
