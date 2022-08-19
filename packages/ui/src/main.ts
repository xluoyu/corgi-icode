/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-19 14:51:24
 */
import { createApp } from 'vue'
import lowcodeComponents from '@corgi-icode/core/components/index'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'
import App from './App.vue'
import FormComponents from './components/form'
const app = createApp(App)
app.use(lowcodeComponents)
app.use(FormComponents)
app.mount('#app')
window.app = app
