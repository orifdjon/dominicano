import { VuexModule, mutation, action, getter, Module } from 'vuex-class-component'

@Module({ namespacedPath: 'general/' })
export class GeneralStore extends VuexModule {
  private title = 'TodoGood'

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
    }
  }

  get projectTitle () : string {
    return this.title
  }
}
