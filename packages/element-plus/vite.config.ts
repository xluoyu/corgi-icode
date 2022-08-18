/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 17:28:23
 */
import path from 'path'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import commonjs from '@rollup/plugin-commonjs'
// import externalGlobals from 'rollup-plugin-external-globals'

module.exports = defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: '@corgi-icode/element-plus',
      fileName: format => `index.${format}.min.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', '@corgi-icode/core'],
      // plugins: [
      //   commonjs(), // 转换 CJS -> ESM, 通过 cdn 引入的没法转
      //   externalGlobals({
      //     vue: 'Vue',
      //   }),
      // ],
      // output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      // globals: {
      //   vue: 'Vue',
      // },
      // paths: {
      //   vue: 'https://cdn.jsdelivr.net/npm/vue@3.2.37/dist/vue.esm-browser.js',
      // },
      // },
    },
  },
  plugins: [
    vueSetupExtend(),
    Vue({
      reactivityTransform: true,
    }),
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
  ],
})
