import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import swiper from '@/plugins/swiper'

createApp(App).use(store).use(router).use(swiper).mount('#app')
