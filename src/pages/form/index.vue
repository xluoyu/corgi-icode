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

const formGroup = createFormGroup()
provide(ProvideFormGroup, formGroup)

</script>

<style scoped>
</style>
