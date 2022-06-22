<template>
  <el-dialog
    v-model="dialogVisible"
    title="生成代码"
    width="60%"
  >
    <div ref="editRef" class="edit" />
    <template #footer>
      <div class="text-center">
        <el-button type="primary" @click="dialogVisible = false">
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
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import type { IFormData } from '@/enum/form/type'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import { renderCode } from '@/enum/form'

const dialogVisible = ref(false)
const editRef = ref(null)
const editInstance = ref<editor.IStandaloneCodeEditor | null>(null)
const formGroup = reactive<IFormData>({
  formOptions: {},
  widgetList: [],
})

const init = () => {
  editInstance.value = editor.create(editRef.value!, {
    value: renderCode(formGroup),
    theme: 'vs-dark',
    language: 'html',
    automaticLayout: true,
    renderLineHighlight: 'all',
    scrollBeyondLastLine: false,
  })
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
