import 'reflect-metadata'
import './style.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './core/router'
import {useAuthStore} from './shared/stores/authStore'
import echoService from './core/services/EchoService'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const authStore = useAuthStore()

if (authStore.isAuthenticated) {
    echoService.initialize()
}

app.mount('#app')