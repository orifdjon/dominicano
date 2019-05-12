import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { store, vmx } from '@/store'
import router from '@/router'
import App from './App.vue'
import * as fb from 'firebase/app'
import './plugins/vuetify'
import './registerServiceWorker'
import Vue2Storage from 'vue2-storage'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyDHhSX8ULd2-2O7wNLBc1rT62Qu5RLYP64',
  authDomain: 'todogood-baf41.firebaseapp.com',
  databaseURL: 'https://todogood-baf41.firebaseio.com',
  projectId: 'todogood-baf41',
  storageBucket: 'todogood-baf41.appspot.com',
  messagingSenderId: '1032870828763',
  appId: '1:1032870828763:web:6ebb66d71eb23994'
}
fb.initializeApp(firebaseConfig)

Vue.use(VueRouter)
Vue.use(Vuex)

// @ts-ignore
Vue.use(Vue2Storage, {
  prefix: 'todoGood_',
  driver: 'local',
  ttl: 60 * 60 * 24 * 1000 // 24 часа
})

new Vue({
  render: h => h(App),
  router,
  store,
  created () {
    // @ts-ignore
    vmx.storage = this.$storage
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        vmx.user.autoLoginUser(user)
          .then(() => {

          })
      }
    })
    vmx.ads.fetchAd()
  }
}).$mount('#app')
