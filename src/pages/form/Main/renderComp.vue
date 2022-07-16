<template>
  <component :is="item.component" v-if="item.noForm" :key="options._key" :item-key="item.key" v-bind="options" @update="updateWidgetSimulateValue" />
  <el-form-item v-else :label="options.label" :prop="options._key">
    <component :is="item.component" :key="options._key" v-bind="options" @update="update" />
  </el-form-item>
</template>

<script lang='ts' setup>
import { ProvideFormGroup } from '@/composables/designer'
import type { IFormComp } from '@/enum/form/type'

const props = defineProps<{
  item: IFormComp
  disUpdate?: Boolean
}>()

const emits = defineEmits(['update'])

// onMounted(() => {
// const ctx = getCurrentInstance()!
// console.log(ctx)
// })

const options = computed(() => Object.keys(props.item.form).reduce((pre, key) => {
  pre[key] = props.item.form[key].value
  return pre
}, {} as Record<string, any>))

const formGroup = inject(ProvideFormGroup)!
const { updateWidgetSimulateValue } = formGroup
const update = (data: any) => {
  if (!props.disUpdate) {
    updateWidgetSimulateValue(data)
  } else {
    emits('update', data)
  }
}
</script>
