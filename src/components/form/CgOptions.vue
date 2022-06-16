<template>
  <el-form-item :label="label">
    <el-table :data="value">
      <el-table-column prop="label" label="名称">
        <template #default="{row}">
          <el-input v-model="row.label" />
        </template>
      </el-table-column>
      <el-table-column prop="value" label="值">
        <template #default="{row}">
          <el-input v-model="row.value" />
        </template>
      </el-table-column>
      <el-table-column prop="value" label="Action">
        <template #default="{$index}">
          <el-button text size="small" type="danger" :icon="Delete" @click="remove($index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" :icon="Plus" class="block mx-auto mt-2" :disabled="disabledAdd" @click="addOption">
      添加
    </el-button>
  </el-form-item>
</template>

<script lang='ts' setup>
import { Delete, Plus } from '@element-plus/icons-vue'
const props = defineProps<{
  label: string
  value?: Array<any>
  _key?: string
  activeValue?: string
  inactiveValue?: string
}>()

const emits = defineEmits(['update'])
const value = ref(props.value)
watch(value, (val) => {
  emits('update', { key: props._key, value: val })
})

const disabledAdd = computed(() => {
  if (!value.value) {
    return true
  }
  return !value.value.every((item) => {
    return item.label && item.value
  })
})

const remove = (index: number) => {
  value.value?.splice(index, 1)
}
const addOption = () => {
  value.value?.push({ label: '', value: '' })
}
</script>
