import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
// import Favorites from '@/components/Favorites.vue'
import Services from '@/components/Services.vue'
import ContactUs from '@/components/ContactUs.vue'
import Account from '@/components/Account.vue'
import changeTitle from '@/router/changeTitle.ts'
import Ad from '@/components/Ads/Ad.vue'
const Favorites = () => import('@/components/Favorites.vue') // TODO полезна ли ленивая загрузка
Vue.use(VueRouter)

export default new VueRouter({
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
      component: Services,
      beforeEnter: changeTitle
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
      beforeEnter: changeTitle
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
      beforeEnter: changeTitle
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'history'
})
