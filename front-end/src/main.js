import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/bulma/css/bulma.css'
import '../public/css/style.css'


store.dispatch('user/checkAuth').then(() => {
    createApp(App)
        .use(store)
        .use(router)
        .mount('#app')
})

