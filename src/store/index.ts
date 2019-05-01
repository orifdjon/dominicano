import Vue from 'vue'
import Vuex from 'vuex'
import { GeneralStore } from '@/store/General'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    general: GeneralStore.ExtractVuexModule(GeneralStore)
  }
})

export const vmx = {
  general: GeneralStore.CreateProxy(store, GeneralStore)
}
