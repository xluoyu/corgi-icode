<template>
  <el-form :model="formData" :rules="rules">
    <div>xxx表单</div>
    <el-divider />
    <el-form-item label="名字" prop="name">
      <el-input v-model="formData.name" placeholder="请输入名字" />
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="formData.age" placeholder="请输入名字" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="formData.sex">
        <el-radio :label="1">
          男
        </el-radio>
        <el-radio :label="2">
          女
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="职位" prop="position">
      <el-select v-model="formData.position">
        <el-option
          v-for="item in positionSelectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-button type="primary">
      提 交
    </el-button>
  </el-form>
</template>

<script lang="ts" setup>
const formData = reactive({
  name: '小明',
  age: 12,
  sex: 1,
  position: 2,
})
const positionSelectList = [
  { label: '前端', value: 1 },
  { label: '后端', value: 2 },
  { label: 'UI', value: 3 },
  { label: '测试', value: 4 },
]

const rules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  age: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: 'Please input Activity name', trigger: 'change' },
  ],
  position: [
    { required: true, message: 'Please input Activity name', trigger: 'change' },
  ],
}
</script>
