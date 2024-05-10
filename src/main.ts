import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from './pinia'
import timeTool from "./plugins/timeTool"
import i18n from "./plugins/i18n"

// element 样式
import "element-plus/dist/index.css"
// element 夜间主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'

import './styles/main.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.use(timeTool)

app.use(i18n)

app.mount('#app')
