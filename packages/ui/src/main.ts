/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-16 16:57:46
 */
import { createApp } from 'vue'
import lowcodeComponents from '@corgi-icode/core/components/index'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'
import App from './App.vue'

const app = createApp(App)
app.use(lowcodeComponents)
app.mount('#app')
