<template>
  <div :class="cls" @click.capture="activeCurComp">
    <slot />
    <div>
      <div class="moveArea text-xs inline-flex px-2 py-1 items-center bg-[#a0cfff]">
        <RiDragMove2Fill />{{ $t(`comps.${item.title}`) }}
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import RiDragMove2Fill from '~icons/ri/drag-move-2-fill'
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
