<template>
  <el-dialog
    v-model="dialogVisible"
    class="codeDialog"
    title="生成代码"
    width="60%"
    :before-close="destroyEditor"
  >
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane v-for="key in fileKeys" :key="key" :label="key" :name="key">
        <div :id="key + 'editRef'" class="edit" />
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <div class="text-center">
        <el-button ref="copyRef" type="primary">
          复制
        </el-button>
        <el-button type="primary" @click="exportFile">
          导出文件
        </el-button>
        <el-button
          type="primary"
          @click="
            () => {
              destroyEditor()
              dialogVisible = false
            }
          "
        >
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import beautify from 'js-beautify'
import Clipboard from 'clipboard'
import type { VNodeRef } from 'vue'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
// import type { IFormData } from '@/enum/form/type'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import { renderCode } from '@/enum/form'
import { isDark } from '@/composables/appConfig'
import { errorMsg } from '@/core'
import type { IWidgetItem } from '@/core'

const dialogVisible = ref(false)
const copyRef = ref<VNodeRef | null>(null)
let copyInstance: Clipboard | null = null

const fileList = ref<Record<string, string>>({}) // 文件列表
let instances: Record<string, editor.IStandaloneCodeEditor> = {} // 编辑器实例

const fileKeys = computed(() => Object.keys(fileList.value))
const activeName = ref('')

const init = (key: string) => {
  const dom = document.querySelector(`#${key}editRef`)
  if (!dom) {
    errorMsg('编辑器初始化失败', 'Main/tool/renderCode.vue line:69')
    return
  }
  instances[key] = editor.create(dom as HTMLElement, {
    value: beautify.html(fileList.value[key], { indent_size: 2 }),
    theme: isDark.value ? 'vs-dark' : 'vs-light',
    language: 'html',
    automaticLayout: true,
    renderLineHighlight: 'all',
    scrollBeyondLastLine: false,
  })
  copyInstance = new Clipboard(copyRef.value!.ref, {
    text: () => {
      return instances[key]?.getValue() || ''
    },
  })
  copyInstance.on('success', () => {
    ElMessage.success('copy success！')
  })
}

const destroyEditor = (deno?: any) => {
  /**
   * 使用原始值调用方法
   */
  Object.values(instances).forEach((item) => {
    item.dispose()
  })
  copyInstance?.destroy()
  fileList.value = {}
  instances = {}

  deno && nextTick(deno)
}

const exportFile = () => {
  const blob = new Blob([instances[activeName.value]?.getValue() || ''], {
    type: 'text/plain;charset=utf-8',
  })
  const a = document.createElement('a')
  a.download = 'form.vue'
  a.href = URL.createObjectURL(blob)
  a.click()
}

const handleClick = () => {
  nextTick(() => {
    if (!instances[activeName.value]) {
      init(activeName.value)
    }
  })
}

const open = (options: IWidgetItem[]) => {
  dialogVisible.value = true
  fileList.value = renderCode(options)
  activeName.value = fileKeys.value[0]
  handleClick()
}

defineExpose({
  open,
})
</script>
<style scoped>
.edit {
  height: 500px;
}
</style>
