import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
// import Favorites from
// import Services from
import ContactUs from '@/components/ContactUs.vue'
import Account from '@/components/Account.vue'
import changeTitle from '@/router/changeTitle.ts'
import Ad from '@/components/Ads/Ad.vue'
import Login from '@/components/Auth/Login.vue'
import Registration from '@/components/Auth/Registration.vue'
import * as firebase from 'firebase'
import { vmx } from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home,
      beforeEnter: changeTitle
    },
    {
      path: '/ad/:id',
      name: 'Ad',
      component: Ad,
      props: true,
      beforeEnter: changeTitle
    },
    {
      path: '/services',
      name: 'Services',
      component: () => import('@/components/Services.vue'),
      beforeEnter: changeTitle
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: () => import('@/components/Favorites.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/contact_us',
      name: 'ContactUs',
      component: ContactUs,
      beforeEnter: changeTitle
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'history'
})

router.beforeEach((to:any, from:any, next:any) => {
  if (to.matched.some((record:any) => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        next({ path: '/login' })
      } else {
        vmx.general.changeTitle(to.name)
        next()
      }
    })
  } else {
    next()
  }
})

export default router
