<!--
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-17 17:26:20
-->
<template>
  <el-header
    class="h-$header-h bg-$theme-bg border-b border-gray-400 z-10 relative"
  >
    <el-row class="h-full" align="middle">
      <el-col :span="12" class="flex items-center">
        <img src="/logo.png" alt="" class="w-12">
        <p class="ml-2">
          <span class="text-xl font-bold">Corgi</span> 代码生成器
        </p>
      </el-col>
      <el-col :span="12" class="flex items-center justify-end">
        <el-dropdown>
          <span class="flex items-center mr-4 text-$el-color-primary">
            {{ curLibName }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in libs" :key="item.name" @click="changeLib(item.name)">
                <img :src="item.icon" alt="" class="w-6 h-6 mr-1">
                <span>{{ item.name }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-icon class="cursor-pointer mr-4" :size="20" @click="toggleDark()">
          <IcBaselineWbSunny v-show="!isDark" />
          <BiCloudMoonFill v-show="isDark" />
        </el-icon>
        <a
          href="https://github.com/xluoyu/corgi-lowcode"
          target="__blank"
          class="cursor-pointer ml-4 leading-0"
        >
          <el-icon :size="20">
            <AkarIconsGithubFill />
          </el-icon>
        </a>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts" setup>
// import { useI18n } from 'vue-i18n'
// import OouiLanguage from '~icons/ooui/language'
import { libs } from '@corgi-icode/core/libs'
import { ArrowDown } from '@element-plus/icons-vue'
import { changeLib, curLibName } from '@corgi-icode/core'
import IcBaselineWbSunny from '~icons/ic/baseline-wb-sunny'
import AkarIconsGithubFill from '~icons/akar-icons/github-fill'
import BiCloudMoonFill from '~icons/bi/cloud-moon-fill'
// import type { ILocale } from '@/composables'
import { isDark, toggleDark } from '@/composables'
// const { locale: curLocale } = useI18n()
// const handleCommand = (command: ILocale) => {
//   locale.value = command
//   curLocale.value = command
// }

// const toTable = () => {
//   ElMessage.info('暂未开发')
// }
</script>
