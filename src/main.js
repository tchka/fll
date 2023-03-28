import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import $ from 'jquery';
import axios from "axios"
import apiPlugin from './plugins/api'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(apiPlugin)
app.mount('#app')
