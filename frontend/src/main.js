// libs import
import { createApp } from 'vue'
import router from './router'
import { createPinia } from "pinia";

// local imports
import './assets/app.css'
import App from './app/App.vue'

// initialize pinia and vue app
const pinia = createPinia();
const app = createApp(App)

// use the pinia and router 
app.use(pinia)
app.use(router)

// mounting the entire app
app.mount('#app')
