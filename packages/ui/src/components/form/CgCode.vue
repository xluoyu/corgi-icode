<!--
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-12 15:49:41
-->
<template>
  <div class="w-full">
    <pre class="code-box" @click="openCodeEmitDialog">{{ dataString }}</pre>

    <el-dialog v-model="dialogVisible" :title="name || '表格数据'" width="60%" @close="destroyEditor">
      <div id="codeEdit" class="h-[500px]" />
      <template #footer>
        <div class="text-center">
          <el-button type="primary" size="default" @click="save">
            保存
          </el-button>
          <el-button type="" size="default" @click="dialogVisible = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import { prettyFormat } from '@/utils'
import { isDark } from '@/composables'
const props = defineProps<{
  value: Object
  _key?: String
  name: string
}>()
const emits = defineEmits(['update'])

const dataString = computed(() => {
  return prettyFormat(props.value)
})

const dialogVisible = ref(false)
let editorInstance: editor.IStandaloneCodeEditor | null = null
function openCodeEmitDialog() {
  dialogVisible.value = true
  nextTick(() => {
    editorInstance = editor.create(document.getElementById('codeEdit') as HTMLElement, {
      value: dataString.value,
      language: 'json',
      theme: isDark.value ? 'vs-dark' : 'vs',
      automaticLayout: true,
      renderLineHighlight: 'all',
      scrollBeyondLastLine: false,
    })
  })
}
function destroyEditor() {
  if (editorInstance) {
    editorInstance.dispose()
    editorInstance = null
  }
}

function save() {
  const data = editorInstance?.getValue() || ''
  emits('update', { key: props._key, value: JSON.parse(data) })
  dialogVisible.value = false
}

</script>

<style scoped>
.code-box{
  background: var(--theme-bg);
  color: var(--theme-color);
  width: 95%;
  max-height: 260px;
  overflow: auto;
}
</style>
