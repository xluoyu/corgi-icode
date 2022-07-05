<template>
  <el-form label-width="auto" size="small">
    <template v-for="item, i in renderList" :key="item.key">
      <el-form-item v-show="item.isShow" :prop="item._key">
        <template #label>
          <div class="flex items-center">
            {{ item.label }}
            <el-tooltip
              v-if="item.tooltip"
              :content="item.tooltip"
            >
              <el-icon class="ml-1">
                <IcBaselineInfo />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <Component :is="'cg-' + item.comp" v-bind="item" @update="(data: any) => emits('update', data, i)" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang='ts' setup>
import CompConfig from '@/enum/form/CompConfig'
import type { IFormItemOptionsArray } from '@/enum/form/type'
import IcBaselineInfo from '~icons/ic/baseline-info'

const props = defineProps<{
  formOptions: IFormItemOptionsArray
}>()

const formOptionsData = computed(() => {
  return props.formOptions.reduce((pre, cur) => {
    return {
      ...pre,
      [cur.key]: cur.value,
    }
  }, {} as Record<string, any>)
})

const isShowFormItems = ref<any>([])

watch(formOptionsData, () => {
  isShowFormItems.value.forEach((item: { obj: { isShow: any }; isShow: (arg0: Record<string, any>) => any }) => {
    item.obj.isShow = item.isShow(formOptionsData.value)
  })
})

const renderList = computed(() => {
  isShowFormItems.value = []
  const res = props.formOptions.map((item) => {
    const obj: any = {
      ...CompConfig[item.type],
      label: item.label,
      tooltip: item.tooltip,
      value: item.value,
      _key: item.key,
      isShow: item.isShow ? item.isShow!(formOptionsData.value) : true,
    }
    if (item.isShow) {
      isShowFormItems.value.push({ obj, isShow: item.isShow })
    }
    return obj
  })
  return res
})

const emits = defineEmits(['update'])
</script>
