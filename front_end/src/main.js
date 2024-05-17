import './assets/style.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice';

const pinia = createPinia()

const app = createApp(App)
app.use(PrimeVue)
import 'primevue/resources/themes/aura-light-green/theme.css'

app.use(ConfirmationService)
app.use(ToastService)
app.use(pinia)
app.use(router, VueAxios, axios)

app.mount('#app')
