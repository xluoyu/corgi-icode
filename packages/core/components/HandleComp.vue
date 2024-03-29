<template>
  <div :class="cls" @click.capture="activeCurComp">
    <slot />
    <div class="handleArea text-light-50">
      <div title="移动组件" class="moveArea">
        <i class="icon">
          <Rank />
        </i>
        {{ item.type }}
      </div>
      <div v-if="sortBtn.left" title="父级组件" @click="sortLeftClick">
        <i class="icon">
          <Back />
        </i>
      </div>
      <div v-if="sortBtn.top" title="上一个组件" @click="sortTopClick">
        <i class="icon">
          <Top />
        </i>
      </div>
      <div v-if="sortBtn.btm" title="下一个组件" @click="sortBtmClick">
        <i class="icon">
          <Bottom />
        </i>
      </div>
      <slot name="handle" />
      <div title="删除组件" @click="removeCurItem">
        <i class="icon">
          <Delete />
        </i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Back, Bottom, Delete, Rank, Top } from '@element-plus/icons-vue'
import type { IWidgetItem } from '../type'
import { activeWidgetKey, curActionWidget, findWidgetItem, getParentForm, widgetList } from '../index'

const props = defineProps<{
  item: IWidgetItem
}>()

const activeCurComp = () => {
  activeWidgetKey.value = props.item.key
}

const cls = computed(() => [
  'handle-comp',
  {
    'handle-comp--active': curActionWidget.value?.key === props.item.key,
  },
  {
    'inline-block': props.item.form?.inline?.value || getParentForm(props.item)?.form.inline.value,
  },
])

const sortBtn = reactive({
  left: false,
  top: false,
  btm: false,
})

/**
 * 当前活跃的组件的父级
 */
const curActionWidgetParent = computed(() => props.item?.parent ? findWidgetItem(props.item.parent) : null)

const parentChild = computed(() => {
  return curActionWidgetParent.value ? curActionWidgetParent.value.children! : widgetList.value
})

// const parentChild = computed(() => {
//   const parent = findWidgetItem(props.item.parent!)
//   return parent ? parent.children! : widgetList.value
// })
/**
 * 计算当前组件需要展示的排序按钮
 */
watch(
  () => parentChild.value,
  () => {
    const parent = props.item.parent || null
    function setTopAndBtm(index: number, list: any[]) {
      sortBtn.left = !!parent
      sortBtn.top = index !== 0
      sortBtn.btm = index < list.length - 1
    }
    setTopAndBtm(parentChild.value.indexOf(props.item), parentChild.value)
  },
  { immediate: true, deep: true },
)

/**
 * 聚焦当前组件的父级
 *
 */
const sortLeftClick = () => {
  const parent = props.item.parent!
  if (parent) {
    // changeActiveWidget(parent)
    activeWidgetKey.value = parent
  }
}

/**
 * 与上一个组件交换位置
 */
const sortTopClick = () => {
  const oldIndex = parentChild.value.indexOf(props.item)
  ;[parentChild.value[oldIndex], parentChild.value[oldIndex - 1]] = [
    parentChild.value[oldIndex - 1],
    parentChild.value[oldIndex],
  ]
}

/**
 * 与下一个组件交换位置
 */
const sortBtmClick = () => {
  const oldIndex = parentChild.value.indexOf(props.item)
  ;[parentChild.value[oldIndex], parentChild.value[oldIndex + 1]] = [
    parentChild.value[oldIndex + 1],
    parentChild.value[oldIndex],
  ]
}

/**
 * 移除当前组件
 */
const removeCurItem = () => {
  const oldIndex = parentChild.value.indexOf(props.item)
  parentChild.value.splice(oldIndex, 1)
}
</script>

<style scoped>
.icon{
  --color: inherit;
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--color);
  font-size: inherit;
}
</style>
