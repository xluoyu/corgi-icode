<template>
  <div id="corgi-form" class="bg-$theme-gary w-full h-full">
    <Header />
    <el-container class="flex justify-between h-[calc(100%-var(--header-h))]">
      <Menu />
      <Main />
      <Action />
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from './Header/index.vue'
import Menu from './Menu/index.vue'
import Action from './Action/index.vue'
import Main from './Main/index.vue'
</script>

<style scoped>
</style>
