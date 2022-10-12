/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-19 14:59:39
 */

declare interface Window {
  app: any
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
