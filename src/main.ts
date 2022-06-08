import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'
import i18 from './utils/i18'

const app = createApp(App)

app.use(router)
app.use(i18)
app.mount('#app')
