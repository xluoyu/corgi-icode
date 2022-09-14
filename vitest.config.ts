/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-16 15:45:28
 */
/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    // exclude: ['**/script/**'],
    include: ['./packages/**/*.{test,spec}.{ts,tsx}'],
  },
})
