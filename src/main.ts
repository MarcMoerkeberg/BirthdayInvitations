import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire } from 'vuefire'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import firebaseApplication from './plugins/vuefire'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueFire, firebaseApplication)

app.mount('#app')
