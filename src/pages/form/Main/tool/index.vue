<template>
  <div class="h-8 px-4 flex items-center justify-between bg-$theme-bg border-x border-b border-gray-400">
    <div />
    <el-space>
      <el-link type="primary" :icon="IconoirSaveActionFloppy" @click="saveTemplate">
        {{ $t('page.saveTemplate') }}
      </el-link>
      <el-link type="primary" :icon="View" @click="view">
        {{ $t('page.view') }}
      </el-link>
      <el-link type="primary" :icon="IcBaselineCode" @click="render">
        {{ $t('page.renderCode') }}
      </el-link>
    </el-space>
  </div>
  <Preview ref="previewDialog" />
  <RenderCode ref="renderCodeDialog" />
</template>

<script lang='ts' setup>
import { View } from '@element-plus/icons-vue'
import domtoimage from 'dom-to-image'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Preview from './preview.vue'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RenderCode from './renderCode.vue'
import IcBaselineCode from '~icons/ic/baseline-code'
import IconoirSaveActionFloppy from '~icons/iconoir/save-action-floppy'
import { ProvideFormGroup } from '@/composables/designer'
import { templateList } from '@/composables/template'
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

const saveTemplate = () => {
  ElMessageBox.prompt('Please input your template name', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(({ value }) => {
      const data = formGroup.returnFormData()
      // 截图功能暂时废弃
      // domtoimage.toPng(document.querySelector('#whiteboard')).then((dataurl) => {
      // })
      templateList.value.push({
        title: value,
        type: 'template',
        key: `${new Date().getTime()}`,
        photo: `http://iph.href.lu/200x200?text=${value}`,
        formOptions: data.formOptions,
        widgetList: data.widgetList,
      })
    })
    .catch()
}
</script>
