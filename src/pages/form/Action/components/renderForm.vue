<template>
  <el-form label-width="auto" size="small">
    <template v-for="item in renderList" :key="item.key">
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
        <Component :is="'cg-' + item.comp" v-bind="item" @update="(data: any) => {changeValue(data, item)}" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang='ts' setup>
import CompConfig from '@/enum/form/CompConfig'
import type { IFormItemOptions, IFormItemOptionsArray } from '@/enum/form/type'
import IcBaselineInfo from '~icons/ic/baseline-info'

const props = defineProps<{
  formOptions: IFormItemOptionsArray
  formData?: IFormItemOptions
}>()
const emits = defineEmits(['update'])

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

const changeValue = (data: any, item: any) => {
  console.log(item)
  item.changeCb && item.changeCb(props.formData)
  emits('update', data)
}

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
      changeCb: item.changeCb,
    }
    if (item.isShow) {
      isShowFormItems.value.push({ obj, isShow: item.isShow })
    }
    return obj
  })
  return res
})

</script>
