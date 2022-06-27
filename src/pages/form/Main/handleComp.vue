<template>
  <div :class="cls" @click.capture="activeCurComp">
    <slot />
    <!-- <div>{{ props.item.form.inline || props.formGroup.formOptions.inline.value }}</div> -->
  </div>
</template>

<script lang='ts' setup>
import { ProvideFormGroup } from '@/composables/designer'
import type { IFormComp } from '@/enum/form/type'

const props = defineProps<{
  item: IFormComp
}>()
const formGroup = inject(ProvideFormGroup)!

const activeCurComp = () => {
  formGroup.changeActiveWidget(props.item.key)
}

const cls = computed(() => [
  'handle-comp',
  { 'handle-comp--active': formGroup.curActionWidget.value?.key === props.item.key },
  { 'inline-block': props.item.form?.inline?.value || formGroup.formOptions.inline.value },
])
</script>
