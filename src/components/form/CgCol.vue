<template>
  <el-col v-bind="options" :class="cls" @click.capture="activeCurComp">
    <template v-if="showType === 'preview'">
      <RenderComp v-for="_item in item.children" :key="_item.key" :item="_item" />
    </template>
    <draggable v-else :list="item.children" item-key="key" group="dragGroup" class="w-full min-h-[40px]" @add="addEnd">
      <template #item="{ element }">
        <HandleComp :item="element">
          <RenderComp :item="element" />
        </HandleComp>
      </template>
    </draggable>
  </el-col>
</template>

<script lang='ts' setup>
import draggable from 'vuedraggable'
import { ProvideFormGroup } from '@/composables/designer'
import HandleComp from '@/pages/form/Main/handleComp.vue'
import RenderComp from '@/pages/form/Main/renderComp.vue'
import type { IFormComp } from '@/enum/form/type'
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
}
</script>
