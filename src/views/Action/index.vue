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
import { curActionWidget, updateActionWidgetOptions } from '@/core'
import IcBaselineInfo from '~icons/ic/baseline-info'
import { itemOptions } from '@/config'

const formOptionsData = computed(() => {
  if (!curActionWidget.value)
    return {}
  return Object.entries(curActionWidget.value.form).reduce((pre, [key, cur]) => {
    pre[key] = cur.value
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
  const res = Object.entries(curActionWidget.value.form).map(([key, item]) => {
    const obj: any = {
      ...itemOptions[item.type as keyof typeof itemOptions],
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
  updateActionWidgetOptions(data.key, data.value)
}

</script>
