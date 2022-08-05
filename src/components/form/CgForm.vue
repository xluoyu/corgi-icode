<template>
  <el-form :model="formData" :rules="validateRules" class="w-full h-full" :class="showType === 'whiteboard' ? 'border border-gray-400 border-dashed' : ''" v-bind="formAttrs">
    <DraggableArea :list="item.children" class="min-h-[100px]" :item-key="item.key">
      <template #default="{ item: _item }">
        <RenderComp :item="_item" />
      </template>
    </DraggableArea>
  </el-form>
</template>

<script lang='ts' setup>
import type { IWidgetItem, objectT } from '@/core'
import { getFormData, mixinValue } from '@/core'
import { validateFn, validates } from '@/config'

const showType = inject('showType')

const props = defineProps<{
  item: IWidgetItem
}>()

const formData = reactive<objectT<any>>({})

function updateFormData() {
  Object.assign(formData, getFormData(props.item))
}

// eslint-disable-next-line vue/no-mutating-props
props.item.updateDataFn = updateFormData

watch(() => props.item.children!.length, updateFormData)

provide('formData', {
  updateFormData(data: { key: string | number; value: any }) {
    formData[data.key] = data.value
  },
})

const formAttrs = computed(() => {
  return Object.entries(props.item.form).reduce((pre, [key, cur]) => {
    const value = cur.value
    if (!value)
      return pre
    if (key.includes('.')) {
      pre = mixinValue(key, value, pre)
    } else {
      /**
       * 表单开启了校验
       */
      if (key === 'validate')
        return pre
      pre[key] = value
    }
    return pre
  }, {} as Record<string, any>)
})

/**
 * 规则校验
 */
const validateRules = computed(() => {
  if (!props.item.form.validate.value)
    return []

  function run(list: IWidgetItem[]) {
    return list.reduce((pre, item) => {
      if (item.children && item.type !== 'form') {
        pre = run(item.children)
        return pre
      }
      if (item.noForm) {
        return pre
      }

      const key = item.form._key.value as string
      const trigger = item.type === 'input' ? 'blur' : 'change'
      const rules: Record<string, any>[] = []

      if (item.form.required && item.form.required.value) {
        rules.push({ required: true, message: `${key} is required`, trigger })
      }

      if (item.form.validate) {
        let validate: string | RegExp | null = item.form.validate?.value

        validate = (
          validate && Object.keys(validates).includes(validate as string)
            ? validates[validate as keyof typeof validates]
            : validate
        ) as RegExp | null

        if (validate) {
          rules.push({ validator: validateFn(key, validate), trigger })
        }
      }

      pre[key] = rules
      return pre
    }, {} as Record<string, any>)
  }

  return run(props.item.children!)
})

</script>
