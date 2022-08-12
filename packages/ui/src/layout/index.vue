<!--
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-11 13:05:24
-->
<template>
  <div id="corgi-form" class="bg-$theme-gary w-full h-full !min-w-screen-xl">
    <Header />
    <el-container class="flex justify-between w-full h-[calc(100%-var(--header-h))]">
      <slot />
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from './Header/index.vue'
</script>
