import type { App } from 'vue'
import CgInput from './CgInput.vue'
import CgSwitch from './CgSwitch.vue'
import CgSelect from './CgSelect.vue'
import CgOptions from './CgOptions.vue'
import CgTextarea from './CgTextarea.vue'
import CgColor from './CgColor.vue'
import CgRadio from './CgRadio.vue'
import CgCheckbox from './CgCheckbox.vue'

const list = {
  CgInput,
  CgSwitch,
  CgSelect,
  CgOptions,
  CgTextarea,
  CgColor,
  CgRadio,
  CgCheckbox,
}

export default {
  install(app: App) {
    Object.keys(list).forEach((key) => {
      app.component(key, list[key as keyof typeof list])
    })
  },
}
