<template>
  <el-col
    v-bind="options"
    :class="cls"
    style="border-color: rgb(74, 74, 74)"
    @click.capture="activeCurComp"
  >
    <template v-if="showType === 'preview'">
      <RenderComp
        v-for="_item in item.children"
        :key="_item.key"
        :item="_item"
      />
    </template>
    <DraggableArea :list="item.children" class="min-h-[50px]" :item-key="item.key">
      <template #default="{ item:_item }">
        <RenderComp :item="_item" />
      </template>
    </DraggableArea>

    <div class="handleArea bottom-0 right-0">
      <div title="父级组件" @click="sortLeftClick">
        <el-icon>
          <Back />
        </el-icon>
      </div>
      <div title="复制一份" @click="copyClick">
        <el-icon>
          <CopyDocument />
        </el-icon>
      </div>
      <div title="删除" @click="removeCurItem">
        <el-icon>
          <Delete />
        </el-icon>
      </div>
    </div>
  </el-col>
</template>

<script lang="ts" setup>
import { Back, CopyDocument, Delete } from '@element-plus/icons-vue'
import type { IFormComp } from '@/enum/form/type'
import { activeWidgetKey, cloneNewWidget, curActionWidget, findWidgetItem } from '@/core'
import colOptions from '@/enum/form/col'
const props = defineProps<{
  item: IFormComp
}>()

const showType = inject('showType')

const activeCurComp = () => {
  activeWidgetKey.value = props.item.key
}

const options = computed(() =>
  Object.entries(props.item.form).reduce((pre, [key, cur]) => {
    pre[key] = cur.value
    return pre
  }, {} as Record<string, any>),
)

const cls = computed(() => {
  return showType === 'preview'
    ? ''
    : [
        'handle-comp',
        {
          'handle-comp--active':
            curActionWidget.value?.key === props.item.key,
        },
      ]
})

const parentChild = computed(() => {
  return findWidgetItem(props.item.parent!).children!
})

/**
 * 聚焦当前组件的父级
 *
 */
const sortLeftClick = () => {
  const parent = props.item.parent!
  if (parent) {
    activeWidgetKey.value = parent
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

  parentChild.value.splice(
    index + 1,
    0,
    Object.assign(cloneNewWidget(colOptions), { parent: props.item.parent }),
  )
}
</script>
