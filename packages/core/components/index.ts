/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 15:38:06
 */
import type { App } from 'vue'
import DraggableArea from './DraggableArea.vue'
import HandleComp from './HandleComp.vue'
import RenderComp from './RenderComp.vue'

export default {
  install(app: App) {
    app.component('DraggableArea', DraggableArea)
    app.component('HandleComp', HandleComp)
    app.component('RenderComp', RenderComp)
  },
}
