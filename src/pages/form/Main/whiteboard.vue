<template>
  <div
    id="whiteboard"
    class="h-800px m-8 p-4 relative bg-$theme-bg .dark:bg-dark-300"
  >
    <p
      v-if="!list.length"
      class="absolute top-1/2 left-0 right-0 mx-auto text-center"
    >
      请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处.
    </p>
    <DraggableArea :list="list" @add="addEnd" />
  </div>
</template>

<script lang="ts" setup>
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

      validate = (
        validate && Object.keys(validates).includes(validate as string)
          ? validates[validate as keyof typeof validates]
          : validate
      ) as RegExp | null

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
  formGroup.addHistory()
}
</script>
