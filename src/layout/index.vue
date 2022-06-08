<template>
  <div id="corgi-form" class="bg-$theme-gary w-full h-full">
    <Header />
    <el-container class="flex justify-between h-[calc(100%-var(--header-h))]">
      <router-view />
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import Header from './Header/index.vue'
</script>
