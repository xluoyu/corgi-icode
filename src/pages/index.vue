<script setup lang="ts">
const name = $ref('')
</script>

<template>
  <div>
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
