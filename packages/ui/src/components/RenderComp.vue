<template>
  <component
    :is="item.component"
    v-if="item.noForm"
    :key="options._key"
    :item="item"
    v-bind="options"
  />
  <el-form-item v-else :label="options.label" :prop="options._key">
    <component
      :is="item.component"
      :key="options._key"
      :item="item"
      v-bind="options"
      @update="update"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import type { IWidgetItem } from '@corgi-icode/core'

const props = defineProps<{
  item: IWidgetItem
  disUpdate?: Boolean
}>()

const emits = defineEmits(['update'])

const options = computed(() =>
  Object.entries(props.item.form).reduce((pre, [key, cur]) => {
    pre[key] = cur.value
    return pre
  }, {} as Record<string, any>),
)

// 判断是否在form之下
const formFn: any = inject('formData')

const update = (data: any) => {
  if (!props.disUpdate) {
    formFn.updateFormData && formFn.updateFormData(data)
  } else {
    emits('update', data)
  }
}
</script>
