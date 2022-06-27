<template>
  <div id="whiteboard" class="h-800px m-8 p-4 bg-$theme-bg .dark:bg-dark-300">
    <el-form :model="formData" class="w-full h-full" v-bind="formAttrs">
      <draggable :list="list" item-key="key" group="dragGroup" class="w-full h-full" @add="addEnd">
        <template #item="{ element }">
          <HandleComp :item="element">
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
import { validateFn, validates } from '@/enum/form'

const formGroup = inject(ProvideFormGroup)!
provide('showType', 'whiteboard') // 显示状态为白板

const { widgetList: list, formSimulateData: formData } = formGroup
/**
 * 生成表单的校验规则
 */
const getFormValidateRules = computed(() => {
  if (!formGroup.formOptions.validate.value)
    return []
  return formGroup.widgetList.value.reduce((pre, item) => {
    if (item.noForm)
      return pre
    const key = item.form._key.value as string
    const trigger = item.type === 'input' ? 'blur' : 'change'

    pre[key] = []
    if (item.form.required && item.form.required.value) {
      pre[key].push({ required: true, message: `${key} is required`, trigger })
    }

    if (item.form.validate) {
      let validate: string | RegExp | null = item.form.validate?.value

      validate = (validate && Object.keys(validates).includes(validate as string) ? validates[validate as keyof typeof validates] : validate) as RegExp | null

      if (validate) {
        pre[key].push({ validator: validateFn(key, validate), trigger })
      }
    }
    return pre
  }, {} as Record<string, any>)
})

const formAttrs = computed(() => {
  return Object.keys(formGroup.formOptions).reduce((pre, key) => {
    const value = formGroup.formOptions[key].value
    if (key.includes('.') && value) {
      pre = mixinValue(key, value, pre)
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

const addEnd = () => {
  formGroup.changeActiveWidget(formGroup.curCloneWidgetKey.value)
}
</script>
