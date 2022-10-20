/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 17:21:58
 */
/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// import visualizer from 'rollup-plugin-visualizer'
import Unocss from 'unocss/vite'
// import progress from 'vite-plugin-progress'

// import { presetUno } from 'unocss'
// import commonjs from 'rollup-plugin-commonjs'
// import externalGlobals from 'rollup-plugin-external-globals'

const plugins = [
  vueSetupExtend(),
  Vue({
    reactivityTransform: true,
  }),
  // progress(),
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

  Unocss({
    // presets: [
    // presetUno(),
    // ...custom presets
    // ],
    shortcuts: [
      ['full', 'w-full h-full'],
    ],
  }),
]

// 打包生产环境才引入的插件
// if (process.env.NODE_ENV === 'production') {
//   // 打包依赖展示
//   plugins.push(
//     visualizer({
//       open: true,
//       gzipSize: true,
//       brotliSize: true,
//     }),
//   )
// }

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../../dist'),
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   external: ['vue'],
    //   plugins: [

    //     commonjs(),
    //     externalGlobals({
    //       vue: 'Vue',
    //     }),
    //   ],
    // },
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      // 'vue': 'https://cdn.jsdelivr.net/npm/vue@3.2.37/dist/vue.esm-browser.js',
    },
  },
  plugins,

  // https://github.com/vitest-dev/vitest
  define: {
    'import.meta.vitest': 'undefined',
  },
})
