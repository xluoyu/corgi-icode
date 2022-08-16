/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-16 15:42:53
 */
/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import visualizer from 'rollup-plugin-visualizer'

const plugins = [
  vueSetupExtend(),
  Vue({
    reactivityTransform: true,
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

  WindiCSS(),
]

// 打包生产环境才引入的插件
if (process.env.NODE_ENV === 'production') {
  // 打包依赖展示
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  )
}

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../../dist'),
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins,

  // https://github.com/vitest-dev/vitest
  define: {
    'import.meta.vitest': 'undefined',
  },
})
