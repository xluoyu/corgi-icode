<template>
  <el-dialog
    v-model="dialogVisible"
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
        <div :id="key + 'editRef'" class="h-[500px]" />
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <div class="text-center">
        <el-button type="primary" @click="copy">
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
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import { compileCode, errorMsg } from '@corgi-icode/core'
import type { IWidgetItem } from '@corgi-icode/core'
import { isDark } from '@/composables/appConfig'

const dialogVisible = ref(false)

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
}

const copy = () => {
  navigator.clipboard.writeText(instances[activeName.value].getValue()).then(() => {
    ElMessage.success('copy success！')
  }).catch(() => {
    ElMessage.error('copy failed！')
  })
}

const destroyEditor = (deno?: any) => {
  /**
   * 使用原始值调用方法
   */
  Object.values(instances).forEach((item) => {
    item.dispose()
  })
  // copyInstance?.destroy()
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
  fileList.value = compileCode(options)
  activeName.value = fileKeys.value[0]
  handleClick()
}

defineExpose({
  open,
})
</script>
