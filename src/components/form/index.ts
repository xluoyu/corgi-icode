import type { App } from 'vue'
const components = import.meta.globEager('./*.vue')
export default {
  install(app: App) {
    console.log('install all components')
    Object.values(components).forEach((item) => {
      app.component(item.default.__name, item.default)
    })
  },
}
