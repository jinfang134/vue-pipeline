import { createApp } from 'vue'
import App from './App.vue'
import VuePipeline from '../index.js'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.use(VuePipeline)
app.use(ElementPlus, {
  size: 'small'
})

app.mount('#app')
