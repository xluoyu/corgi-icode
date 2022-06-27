<template>
  <el-dialog
    v-model="dialogVisible"
    title="表单预览"
    width="60%"
  >
    <el-form :model="formData" class="w-full h-full" v-bind="formAttrs">
      <RenderComp v-for="item in formOptions.widgetList" :key="item.key" :item="item" @update="(data) => updateWidgetSimulateValue({key: data.key, value: data.value})" />
    </el-form>
    <template #footer>
      <div class="text-center">
        <el-button type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import RenderComp from '../renderComp.vue'
import { validateFn, validates } from '@/enum/form'
import type { IFormData } from '@/enum/form/type'
import { mixinValue } from '@/utils'

const dialogVisible = ref(false)
provide('showType', 'preview') // 显示状态为预览
const formOptions = reactive<IFormData>({
  formOptions: {},
  widgetList: [],
})

const formAttrs = ref({})
/**
 * 表单校验
 */
const getFormValidateRules = () => {
  if (!formOptions.formOptions.validate.value)
    return []
  return formOptions.widgetList.reduce((pre, item) => {
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
}
/**
 * form 属性
 */
const getFormAttrs = () => {
  formAttrs.value = Object.keys(formOptions.formOptions).reduce((pre, key) => {
    const value = formOptions.formOptions[key].value
    if (key.includes('.')) {
      mixinValue(key, value, pre)
    } else {
      /**
       * 表单开启了校验
       */
      if (key === 'validate' && value) {
        pre.rules = getFormValidateRules()
      }
      pre[key] = value
    }
    return pre
  }, {} as Record<string, any>)
}

const formData = ref<any>({})
const getFormSimulateData = () => {
  formData.value = formOptions.widgetList.reduce((pre, item) => {
    if (item.noForm)
      return pre
    const key = item.form._key.value as string
    const value = item.form.value.value
    pre[key] = value || ''
    return pre
  }, {} as Record<string, any>)
}
const updateWidgetSimulateValue = ({ key, value }: { key: string; value: any }) => {
  formData.value[key] = value
}

const open = (options: IFormData) => {
  dialogVisible.value = true
  formOptions.formOptions = options.formOptions
  formOptions.widgetList = options.widgetList
  getFormAttrs()
  getFormSimulateData()
}

defineExpose({
  open,
})
</script>
