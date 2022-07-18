<template>
  <el-card :style="{'--el-card-bg-color': background, '--el-card-padding': '6px'}">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="pl-1">{{ title }}</span>
        <el-button class="button" text @click="collapseStatus = !collapseStatus">
          <el-icon>
            <ArrowDown v-if="collapseStatus" />
            <ArrowUp v-else />
          </el-icon>
          <span>{{ collapseStatus ? '展开' : '收起' }}</span>
        </el-button>
      </div>
    </template>
    <el-collapse-transition v-if="!collapseStatus && collapse">
      <DraggableArea :list="children" class="min-h-[60px]" @add="addEnd" />
    </el-collapse-transition>

    <DraggableArea v-if="!collapse" :list="children" class="min-h-[60px]" @add="addEnd" />
  </el-card>
</template>

<script lang='ts' setup>
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { ProvideFormGroup } from '@/composables/designer'
const props = defineProps<{
  title: string
  collapse: boolean
  background: string
  itemKey: string
}>()

const formGroup = inject(ProvideFormGroup)!
const { children } = formGroup.findWidgetItem(props.itemKey)!

const addEnd = () => {
  children?.forEach((child) => {
    child.parent = props.itemKey
  })
  formGroup.changeActiveWidget(formGroup.curCloneWidgetKey.value)
  formGroup.addHistory()
}

const collapseStatus = ref(false)

</script>

<style scoped>
.el-card__header{
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
