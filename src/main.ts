import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'
// import i18 from './utils/i18'
import GlobalComponents from '@/components/form/index'
import lowcodeComponents from '@/core/components/index'

const app = createApp(App)
app.config.globalProperties.TestFn = () => {
  console.log('testFn')
}
app.use(router as any)
app.use(GlobalComponents)
app.use(lowcodeComponents)
app.mount('#app')
