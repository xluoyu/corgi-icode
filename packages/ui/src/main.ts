import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'
import GlobalComponents from '@/components/form/index'
import lowcodeComponents from '@/core/components/index'

const app = createApp(App)
app.use(GlobalComponents)
app.use(lowcodeComponents)
app.mount('#app')
