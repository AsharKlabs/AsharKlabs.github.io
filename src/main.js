import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const redirect = sessionStorage.getItem('gh-pages-redirect')
if (redirect) {
  sessionStorage.removeItem('gh-pages-redirect')
  history.replaceState(null, '', redirect)
}

createApp(App).use(router).mount('#app')
