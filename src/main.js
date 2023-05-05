import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/main.css'

const app = createApp(App)
app.config.globalProperties.$api = {
  apiLink: "https://api.unsplash.com",
  clientId: "IezawPRQTq40lRgOjbqE8OW4rGkgM7ZX3qspeAfoew4",
  baerer: "4Nso5_aR4-8GalbUWi3EZsaHyGDSNU85lvOsTwX_PNc",
  perPage: 9,
}

app.use(router)
app.mount('#app')