<template>
  <el-form :model="formData" :style="{width: 'auto'}" label-width="auto" label-position="left">
    <el-form-item label="输入框">
      <el-input v-model="formData.input_0" type="text" placeholder="请输入内容" />
    </el-form-item>
    <el-form-item label="选择框">
      <el-select v-model="formData.select_1" placeholder="请输入内容">
        <el-option v-for="item in select_1SelectList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
const formData = reactive({
  input_0: '',
  select_1: '',
})

const select_1SelectList = [{
  label: '选项一',
  value: 1,
}, {
  label: '选项二',
  value: 2,
}, {
  label: '选项三',
  value: 3,
}]
</script>
