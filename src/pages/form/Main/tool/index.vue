<template>
  <div class="h-8 px-4 flex items-center justify-between bg-$theme-bg border-x border-b border-gray-400">
    <div>
      <el-button :icon="AkarIconsArrowBack" :type="historyListLength === 1 ? '' : 'primary'" text size="large" class="px-4" :disabled="historyListLength === 1" @click="historyBack" />
      <el-button :icon="AkarIconsArrowForward" :type="curHistoryNum === 1 ? '' : 'primary'" text :disabled="curHistoryNum === 1" @click="historyGo" />
      <el-button text type="primary" :icon="Delete" @click="clearList">
        {{ $t('page.clear') }}
      </el-button>
    </div>
    <el-space>
      <el-button v-if="useEnv === 'vscode'" text type="primary" :icon="AkarIconsVueFill" @click="saveFileOptions.dialog = true">
        {{ $t('page.saveFile') }}
      </el-button>
      <el-button text type="primary" :icon="IconoirSaveActionFloppy" @click="saveTemplate">
        {{ $t('page.saveTemplate') }}
      </el-button>
      <el-button text type="primary" :icon="View" @click="view">
        {{ $t('page.view') }}
      </el-button>
      <el-button text type="primary" :icon="IcBaselineCode" @click="render">
        {{ $t('page.renderCode') }}
      </el-button>
    </el-space>
  </div>
  <Preview ref="previewDialog" />
  <RenderCode ref="renderCodeDialog" />

  <el-dialog
    v-model="saveFileOptions.dialog"
    title="Tip"
    width="400px"
  >
    <p>Please input your file name</p>
    <br>
    <el-input v-model="saveFileOptions.fileName">
      <template #append>
        .vue
      </template>
    </el-input>

    <template #footer>
      <el-button @click="saveFileOptions.dialog = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="saveFile">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { Delete, View } from '@element-plus/icons-vue'
import beautify from 'js-beautify'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Preview from './preview.vue'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RenderCode from './renderCode.vue'
import IcBaselineCode from '~icons/ic/baseline-code'
import AkarIconsVueFill from '~icons/akar-icons/vue-fill'
import IconoirSaveActionFloppy from '~icons/iconoir/save-action-floppy'
import AkarIconsArrowForward from '~icons/akar-icons/arrow-forward'
import AkarIconsArrowBack from '~icons/akar-icons/arrow-back'
import { ProvideFormGroup, historyWidgetList, uuId } from '@/composables/designer'
import { localTemplateList } from '@/composables/template'
import { useEnv } from '@/composables/appConfig'
import { renderCode } from '@/enum/form'
const formGroup = inject(ProvideFormGroup)!
const previewDialog = ref<InstanceType<typeof Preview> | null>(null)
const renderCodeDialog = ref<InstanceType<typeof RenderCode> | null>(null)
const view = () => {
  const data = formGroup.returnFormData()
  previewDialog.value!.open(data)
}
const render = () => {
  const data = formGroup.returnFormData()
  renderCodeDialog.value!.open(data)
}

const saveFileOptions = reactive({
  dialog: false,
  fileName: '',
})

const saveFile = () => {
  const code = beautify.html(renderCode(formGroup.returnFormData()), { indent_size: 2 })
  window.parent.postMessage({
    cmd: 'saveFile',
    data: {
      fileName: `${saveFileOptions.fileName}.vue`,
      code,
    },
  }, '*')

  saveFileOptions.dialog = false
}

/**
 * 保存数据模板
 */
const saveTemplate = () => {
  ElMessageBox.prompt('Please input your template name', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => {
      const data = formGroup.returnFormData()
      localTemplateList.value.push({
        title: value,
        type: 'template',
        key: `${new Date().getTime()}`,
        photo: `http://iph.href.lu/200x200?text=${value}`,
        formOptions: data.formOptions,
        widgetList: data.widgetList,
        uuId: uuId.value,
      })
    })
    .catch()
}

const clearList = () => {
  formGroup.widgetList.value = []
}

// 记录返回历史记录的step
const curHistoryNum = ref(1)

const historyListLength = computed(() => historyWidgetList.value.length)

// 前进
const historyGo = () => {
  curHistoryNum.value = Math.max(1, curHistoryNum.value - 1)
  formGroup.widgetList.value = historyWidgetList.value[historyListLength.value - curHistoryNum.value]
}

// 后退
const historyBack = () => {
  curHistoryNum.value++
  formGroup.widgetList.value = historyWidgetList.value[historyListLength.value - curHistoryNum.value]
}
</script>
