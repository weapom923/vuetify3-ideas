/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import vuetify from './plugins/vuetify'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

createApp(App)
  .use(vuetify)
  .mount('#app');
