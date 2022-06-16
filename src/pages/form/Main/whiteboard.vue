<template>
  <div class="h-800px m-8 p-4 bg-$theme-bg .dark:bg-dark-300">
    <el-form :model="formData" class="w-full h-full" v-bind="formAttrs">
      <draggable :list="list" item-key="key" group="dragGroup" class="w-full h-full">
        <template #item="{ element, index }">
          <HandleComp :item="element" :index="index" :form-group="formGroup">
            <RenderComp :item="element" @update="(data) => updateWidgetSimulateValue({key: data.key, value: data.value})" />
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
import type { withRegExp } from '@/enum/form/type'

const formGroup = inject(ProvideFormGroup)!

const { widgetList: list, formSimulateData: formData, updateWidgetSimulateValue } = formGroup
/**
 * 生成表单的校验规则
 */
const getFormValidateRules = computed(() => {
  return formGroup.widgetList.value.reduce((pre, item) => {
    const key = item.form._key.value as string
    let validate: withRegExp = item.form.validate.value
    const required = item.form.required.value
    const trigger = item.type === 'input' ? 'blur' : 'change'

    pre[key] = []
    if (required) {
      pre[key].push({ required: true, message: `${key} is required`, trigger })
    }

    validate = (Object.keys(validates).includes(validate as string) ? validates[validate as keyof typeof validates] : validate) as RegExp | null

    if (validate) {
      pre[key].push({ validator: validateFn(key, validate), trigger })
    }

    return pre
  }, {} as Record<string, any>)
})

const formAttrs = computed(() => {
  return Object.keys(formGroup.formOptions).reduce((pre, key) => {
    const value = formGroup.formOptions[key].value

    if (key.includes('.')) {
      mixinValue(key, value, pre)
    } else {
      /**
       * 表单开启了校验
       */
      if (key === 'validate' && value) {
        pre.rules = getFormValidateRules.value
      }
      pre[key] = value
    }
    return pre
  }, {} as Record<string, any>)
})
</script>
