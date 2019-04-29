import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { store } from '@/store'
import router from '@/router'
import App from './App.vue'
import './plugins/vuetify'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  store

}).$mount('#app')
