<template>
  <el-dialog
    v-model="dialogVisible"
    title="生成代码"
    width="60%"
    :before-close="destroyEditor"
  >
    <div ref="editRef" class="edit" />
    <template #footer>
      <div class="text-center">
        <el-button ref="copyRef" type="primary">
          复制
        </el-button>
        <el-button type="primary" @click="exportFile">
          导出文件
        </el-button>
        <el-button type="primary" @click="() => {destroyEditor(); dialogVisible = false}">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import beautify from 'js-beautify'
import Clipboard from 'clipboard'
import type { VNodeRef } from 'vue'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import type { IFormData } from '@/enum/form/type'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import { renderCode } from '@/enum/form'
import { isDark } from '@/composables/appConfig'

const dialogVisible = ref(false)
const copyRef = ref<VNodeRef | null>(null)
const editRef = ref(null)
let editInstance: editor.IStandaloneCodeEditor | null = null
let copyInstance: Clipboard | null = null

const formGroup = reactive<IFormData>({
  formOptions: {},
  widgetList: [],
})

const init = () => {
  editInstance = editor.create(editRef.value!, {
    value: beautify.html(renderCode(formGroup), { indent_size: 2 }),
    theme: isDark.value ? 'vs-dark' : 'vs-light',
    language: 'html',
    automaticLayout: true,
    renderLineHighlight: 'all',
    scrollBeyondLastLine: false,
  })
  copyInstance = new Clipboard(copyRef.value!.ref, {
    text: () => {
      return editInstance?.getValue() || ''
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
  editInstance?.dispose()
  copyInstance?.destroy()
  deno && nextTick(deno)
}

const exportFile = () => {
  const blob = new Blob([editInstance?.getValue() || ''], { type: 'text/plain;charset=utf-8' })
  const a = document.createElement('a')
  a.download = 'form.vue'
  a.href = URL.createObjectURL(blob)
  a.click()
}

const open = (options: IFormData) => {
  dialogVisible.value = true
  formGroup.formOptions = options.formOptions
  formGroup.widgetList = options.widgetList
  nextTick(() => {
    init()
  })
}

defineExpose({
  open,
})
</script>
<style scoped>
.edit{
  height: 500px;
}
</style>
