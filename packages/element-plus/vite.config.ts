/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-15 17:28:53
 */
import path from 'path'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import Vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'corgi-element-plus',
      fileName: format => `corgi-element-plus.${format}.js`,
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
  plugins: [
    vueSetupExtend(),
    Vue({
      reactivityTransform: true,
    }),
    Icons({
      autoInstall: true,
    }),
  ],
})
