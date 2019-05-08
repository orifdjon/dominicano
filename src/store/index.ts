import Vue from 'vue'
import Vuex from 'vuex'
import { GeneralStore } from '@/store/modules/general'
import { SharedStore } from '@/store/modules/shared'
import { AdsStore } from '@/store/modules/ads'
import { UserStore } from '@/store/modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    general: GeneralStore.ExtractVuexModule(GeneralStore),
    shared: SharedStore.ExtractVuexModule(SharedStore),
    ads: AdsStore.ExtractVuexModule(AdsStore),
    user: UserStore.ExtractVuexModule(UserStore)
  }
})

export const vmx = {
  general: GeneralStore.CreateProxy(store, GeneralStore),
  shared: SharedStore.CreateProxy(store, SharedStore),
  ads: AdsStore.CreateProxy(store, AdsStore),
  user: UserStore.CreateProxy(store, UserStore)
}
