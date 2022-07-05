<script setup lang="ts">
const name = $ref('')
const value = ref([])
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]

const value1 = ref('')
const isRange = ref(false)
</script>

<template>
  <div>
    <el-checkbox-group v-model="value">
      <el-checkbox v-for="item in options" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>

    <el-input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      class="w-80"
    />

    <div>
      <el-button
        type="primary"
        :disabled="!name"
        class="mt-4"
      >
        Go
      </el-button>
    </div>

    <el-row class="min-h-[80px]">
      <el-col :span="12" class="bg-light-100" />
      <el-col :span="12" class="bg-red-300" />
    </el-row>
    <el-button @click="isRange = !isRange">
      change
    </el-button>
    <el-time-picker v-model="value1" :is-range="isRange" placeholder="Arbitrary time" />
  </div>
</template>
