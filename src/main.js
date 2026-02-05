import './assets/app.css'

import { createApp } from 'vue'
import router from './router'
import App from './app/App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
