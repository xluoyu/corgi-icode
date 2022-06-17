<script setup lang="ts">
const name = $ref('')
const value = ref([])
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]
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
  </div>
</template>
