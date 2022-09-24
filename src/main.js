import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask'
Vue.use(VueMask);

let vue = new Vue({
  vuetify,
  render: h => h(App)
})
vue.$mount('#app')
