<template>
  <Menu />
  <Main />
  <Action />
</template>

<script setup lang="ts">
import Menu from './Menu/index.vue'
import Action from './Action/index.vue'
import Main from './Main/index.vue'
import { ProvideFormGroup, createFormGroup } from '@/composables/designer'
import { useEnv } from '@/composables/appConfig'

const formGroup = createFormGroup()
provide(ProvideFormGroup, formGroup)

// onMounted(() => {
if (window.parent !== window) {
  console.log('当前处在iframe下')

  const methods = {
    getEnv(data: any) {
      if (data.env === 'vscode') {
        useEnv.value = 'vscode'
      } else {
        ElMessage.warning('检测到奇怪的iframe环境!')
      }
    },
  }

  window.parent.postMessage(
    {
      cmd: 'getEnv',
    },
    '*',
  )

  window.addEventListener('message', (ev) => {
    if (ev.data.type && methods[ev.data.type as keyof typeof methods]) {
      methods[ev.data.type as keyof typeof methods](ev.data.data)
    }
  })
}
</script>

<style scoped></style>
