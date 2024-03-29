<template>
  <el-form ref="formRef" :model="formData" :rules="validateRules" :class="{border: showType === 'whiteboard'}" v-bind="formAttrs" :inline="inline">
    <DraggableArea :list="item.children" :class="{'inline-block': inline}" :item-key="item.key" empty="表单区域">
      <template #default="{ item: _item }">
        <RenderComp :item="_item" />
      </template>
    </DraggableArea>
    <el-form-item>
      <el-button type="primary" @click="submit">
        {{ formType === 'form' ? '提交' : '搜索' }}
      </el-button>
      <el-button @click="reset">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import type { IWidgetItem } from '@corgi-icode/core'
import { cloneNewWidget, curCloneWidgetKey, getFormData, mixinValue } from '@corgi-icode/core'
import type { FormInstance } from 'element-plus'
import inputOptions from '../input/options'
import { optionsWithComponent } from '../index'
import validateFn from './validate'

const showType = inject('showType')

const props = withDefaults(defineProps<{
  item: IWidgetItem
  inline: boolean
  formType: string
}>(), {
  formType: 'form',
})

const formData = reactive<any>({})

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

onMounted(() => {
  if (showType === 'whiteboard' && !props.item.children!.length) {
    inputOptions.component = optionsWithComponent('input')

    props.item.children!.push(
      Object.assign(cloneNewWidget(inputOptions), { parent: props.item.key }),
    )
    // 将活跃节点的key锁定为grid
    curCloneWidgetKey.value = props.item.key
  }
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
        const validate: RegExp | null = item.form.validate?.value

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

const formRef = ref<FormInstance>()

const submit = () => {
  if (Object.keys(validateRules.value).length) {
    formRef.value?.validate((valid) => {
      if (valid) {
        console.log(formData)
      }
    })
  } else {
    console.log(formData)
  }
}
const reset = () => {
  console.log('重置')
}

</script>

<style scoped>
.border{
  border: 1px dashed #9ca3af;
}
.inline-block{
  display: inline-block;
}
</style>
