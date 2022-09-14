<template>
  <el-dialog v-model="dialogVisible" title="表单预览" width="60%" @close="close">
    <RenderComp
      v-for="item in widgetList"
      :key="item.key"
      :dis-update="true"
      :item="item"
    />
    <template #footer>
      <div class="text-center">
        <el-button type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { IWidgetItem } from '@corgi-icode/core'

const dialogVisible = ref(false)
provide('showType', 'preview') // 显示状态为预览
provide('formData', null)
const widgetList = ref<IWidgetItem[]>([])

const open = (options: IWidgetItem[]) => {
  dialogVisible.value = true
  widgetList.value = options
}

const close = () => {
  widgetList.value = []
}

defineExpose({
  open,
})
</script>
