<template>
  <el-form-item>
    <template #label>
      <div class="flex items-center">
        {{ label }}
        <el-tooltip
          v-if="tooltip"
          :content="tooltip"
        >
          <el-icon class="ml-1">
            <IcBaselineInfo />
          </el-icon>
        </el-tooltip>
      </div>
    </template>
    <el-select v-model="value" :placeholder="placeholder">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<script lang='ts' setup>
import IcBaselineInfo from '~icons/ic/baseline-info'
const props = defineProps<{
  label: string
  _key?: string
  value?: string
  options?: { label: string; value: string | number }[]
  tooltip?: string
  placeholder?: string
}>()

const emits = defineEmits(['update'])

const value = ref(props.value)
watch(value, (val) => {
  emits('update', { key: props._key, value: val })
})
</script>
