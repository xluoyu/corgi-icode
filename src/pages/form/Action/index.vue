<template>
  <el-aside class="bg-$theme-bg w-1/6 px-4">
    <h3 v-if="curActionWidget" class="text-base py-2 text-$el-color-primary">
      组件配置
    </h3>
    <p v-else class="text-center mt-12 opacity-70">
      暂无选定组件
    </p>
    <el-form v-if="curActionWidget" :key="curActionWidget.key" label-width="auto" size="small">
      <template v-for="item in renderList" :key="item.key">
        <el-form-item v-show="item.show" :prop="item._key">
          <template #label>
            <div class="flex items-center">
              {{ item.label }}
              <el-tooltip v-if="item.tooltip" :content="item.tooltip">
                <el-icon class="ml-1">
                  <IcBaselineInfo />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
          <Component
            :is="item.component"
            v-bind="item"
            @update="(data: any) => {changeValue(data, item)}"
          />
        </el-form-item>
      </template>
    </el-form>
  </el-aside>
</template>

<script lang="ts" setup>
import { curActionWidget } from '@/core'
import IcBaselineInfo from '~icons/ic/baseline-info'
import CompConfig from '@/enum/form/CompConfig'

const formOptionsData = computed(() => {
  if (!curActionWidget.value)
    return {}
  return Object.keys(curActionWidget.value.form).reduce((pre, key) => {
    pre[key] = curActionWidget.value!.form[key].value
    return pre
  }, {} as Record<string, any>)
})

const isShowFormItems = ref<any>([])

watch(formOptionsData, () => {
  isShowFormItems.value.forEach((item: any) => {
    item.show = item.isShow(formOptionsData.value)
  })
})

/**
 * 根据组件的form表单，生成渲染数组
 */
const renderList = computed(() => {
  if (!curActionWidget.value)
    return []
  isShowFormItems.value = []
  const res = Object.keys(curActionWidget.value.form).map((key) => {
    const item = curActionWidget.value!.form[key]
    const obj: any = {
      ...CompConfig[item.type as keyof typeof CompConfig],
      label: item.label,
      value: item.value,
      _key: key,
      show: true,
    }

    if (obj.isShow) {
      obj.show = obj.isShow(formOptionsData.value)
      isShowFormItems.value.push(obj)
    }

    return obj
  })
  return res
})

const changeValue = (data: any, item: any) => {
  curActionWidget.value!.form[data.key].value = data.value
}

</script>
