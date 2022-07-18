<template>
  <el-col v-bind="options" :class="cls" style="border-color: rgb(74,74,74)" @click.capture="activeCurComp">
    <template v-if="showType === 'preview'">
      <RenderComp v-for="_item in item.children" :key="_item.key" :item="_item" />
    </template>
    <DraggableArea :list="item.children" class="min-h-[50px]" @add="addEnd" />

    <div class="handleArea !text-base bottom-0 right-0">
      <el-icon @click="sortLeftClick">
        <Back />
      </el-icon>
      <el-icon @click="copyClick">
        <CopyDocument />
      </el-icon>
      <el-icon @click="removeCurItem">
        <Delete />
      </el-icon>
    </div>
  </el-col>
</template>

<script lang='ts' setup>
import { Back, CopyDocument, Delete } from '@element-plus/icons-vue'
// import draggable from 'vuedraggable'
import { ProvideFormGroup, addNewWidget } from '@/composables/designer'
import type { IFormComp } from '@/enum/form/type'
import colOptions from '@/enum/form/col'
const props = defineProps<{
  item: IFormComp
}>()

const formGroup = inject(ProvideFormGroup)!
const showType = inject('showType')

const activeCurComp = () => {
  formGroup.changeActiveWidget(props.item.key)
}

const options = computed(() => Object.keys(props.item.form).reduce((pre, key) => {
  pre[key] = props.item.form[key].value
  return pre
}, {} as Record<string, any>))

const cls = computed(() => {
  return showType === 'preview'
    ? ''
    : [
        'handle-comp',
        { 'handle-comp--active': formGroup.curActionWidget.value?.key === props.item.key },
      ]
})

const addEnd = () => {
  props.item.children?.forEach((child) => {
    child.parent = props.item.key
  })
  formGroup.changeActiveWidget(formGroup.curCloneWidgetKey.value)
  formGroup.addHistory()
}

const parentChild = computed(() => {
  const parent = formGroup.findWidgetItem(props.item.parent!)
  return parent ? parent.children! : formGroup.widgetList.value
})

/**
 * 聚焦当前组件的父级
 *
 */
const sortLeftClick = () => {
  const parent = props.item.parent!
  if (parent) {
    formGroup.changeActiveWidget(parent)
  }
}

const removeCurItem = () => {
  const oldIndex = parentChild.value.indexOf(props.item)
  parentChild.value.splice(oldIndex, 1)
}

/**
 * 复制一个col组件
 */
const copyClick = () => {
  const index = parentChild.value.indexOf(props.item)

  parentChild.value.splice(index + 1, 0, Object.assign(addNewWidget(colOptions), { parent: props.item.parent }))
}
</script>
