/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-15 11:19:25
 */
import type { App } from 'vue'
const components = import.meta.glob('./*.vue', { eager: true })
export default {
  install(app: App) {
    Object.values(components).forEach((item) => {
      app.component(item.default.__name, item.default)
    })
  },
}
