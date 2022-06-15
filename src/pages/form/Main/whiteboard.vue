<template>
  <div class="h-800px m-8 p-4 bg-$theme-bg .dark:bg-dark-300">
    <el-form :model="formData" class="w-full h-full" v-bind="formAttrs">
      <draggable :list="list" item-key="key" group="dragGroup" class="w-full h-full">
        <template #item="{ element, index }">
          <HandleComp :item="element" :index="index" :form-group="formGroup">
            <RenderComp :item="element" @update="(data) => updateWidgetSimulateValue({key: element.key, value: data.value})" />
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
import { validateFn, validates } from '@/enum/form'

const formGroup = inject(ProvideFormGroup)!

const { widgetList: list, formSimulateData: formData, updateWidgetSimulateValue } = formGroup
/**
 * 生成表单的校验规则
 */
const getFormValidateRules = computed(() => {
  return formGroup.widgetList.value.reduce((pre, item) => {
    const key = item.form.find(e => e.key === '_key').value
    let validate = item.form.find(e => e.key === 'validate').value
    const required = item.form.find(e => e.key === 'required').value
    const trigger = item.type === 'input' ? 'blur' : 'change'

    pre[key] = []
    if (required) {
      pre[key].push({ required: true, message: `${key} is required`, trigger })
    }

    validate = Object.keys(validates).includes(validate) ? validates[validate as keyof typeof validates] : validate

    if (validate) {
      pre[key].push({ validator: validateFn(key, validate), trigger })
    }

    return pre
  }, {} as Record<string, any>)
})

const formAttrs = computed(() => {
  return formGroup.formOptions.value.reduce((pre, attrItem) => {
    const { key, value } = attrItem

    if (key.includes('.')) {
      mixinValue(key, value, pre)
    } else {
      /**
       * 表单开启了校验
       */
      if (key === 'validate' && value) {
        pre.rules = getFormValidateRules.value

        console.log(pre.rules)
      }
      pre[key] = value
    }
    return pre
  }, {} as Record<string, any>)
})
</script>
