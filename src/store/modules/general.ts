import { VuexModule, mutation, action, getter, Module } from 'vuex-class-component'

@Module({ namespacedPath: 'general/' })
export class GeneralStore extends VuexModule {
  @getter title = 'TodoGood'

  @mutation changeTitle (name: string) {
    switch (name) {
      case 'Home': {
        this.title = 'TodoGood'
        break
      }
      case 'Services': {
        this.title = 'Services'
        break
      }
      case 'Favorites': {
        this.title = 'Favorites'
        break
      }
      case 'ContactUs': {
        this.title = 'Contact us'
        break
      }
      case 'Account': {
        this.title = 'Account'
        break
      }
      case 'Ad': {
        this.title = 'Offer'
        break
      }
    }
  }
}
