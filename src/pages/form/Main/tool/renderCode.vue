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
        <el-button type="primary" @click="destroyEditor">
          Vue2
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Vue3
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          导出文件
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import beautify from 'js-beautify'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import type { IFormData } from '@/enum/form/type'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import { renderCode } from '@/enum/form'

const dialogVisible = ref(false)
const editRef = ref(null)
let editInstance: editor.IStandaloneCodeEditor | null = null
const formGroup = reactive<IFormData>({
  formOptions: {},
  widgetList: [],
})

const init = () => {
  editInstance = editor.create(editRef.value!, {
    value: beautify.html(renderCode(formGroup), { indent_size: 2 }),
    theme: 'vs-dark',
    language: 'html',
    automaticLayout: true,
    renderLineHighlight: 'all',
    scrollBeyondLastLine: false,
  })
}

const destroyEditor = (deno: any) => {
  /**
   * 使用原始值调用方法
   */
  editInstance?.dispose()
  deno()
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
