import { VuexModule, mutation, action, getter, Module } from 'vuex-class-component'

@Module({ namespacedPath: 'user/' })
export class UserStore extends VuexModule {
}
