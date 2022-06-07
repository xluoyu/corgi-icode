import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'virtual:windi.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
