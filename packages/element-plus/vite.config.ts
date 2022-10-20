/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 17:21:58
 */

import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import progress from 'vite-plugin-progress'
// import Unocss from 'unocss/vite'

const plugins = [
  vueSetupExtend(),
  Vue({
    reactivityTransform: true,
  }),
  progress({
    srcDir: '.',
  }),
  // https://github.com/antfu/unplugin-auto-import
  AutoImport({
    imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core'],
    resolvers: [
      ElementPlusResolver(),
    ],
    dts: true,
  }),

  // https://github.com/antfu/vite-plugin-components
  Components({
    resolvers: [
      ElementPlusResolver(),
    ],
    dts: true,
  }),

  Icons({
    autoInstall: true,
  }),

  // Unocss({
  //   shortcuts: [
  //     ['full', 'w-full h-full'],
  //   ],
  // }),
]

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: '@corgi-icode/element-plus',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins,
})
