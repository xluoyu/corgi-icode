import type { App } from 'vue'
import DraggableArea from './DraggableArea.vue'
import HandleComp from './HandleComp.vue'

export default {
  install(app: App) {
    app.component('DraggableArea', DraggableArea)
    app.component('HandleComp', HandleComp)
  },
}
