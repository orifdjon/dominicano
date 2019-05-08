import { action, getter, Module, mutation, VuexModule } from 'vuex-class-component'
import { vmx } from '@/store'
import * as fb from 'firebase'

class User {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string
  ) {}
}

interface IUserData {
  email: string
  password: string
}

@Module({ namespacedPath: 'user/' })
export class UserStore extends VuexModule {
  @getter user?: User

  get isUserLoggedIn () {
    return this.user !== null
  }

  @mutation setUser (user: User) {
    this.user = user
  }

  @action async registerUser ({ email, password }: IUserData) {
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    try {
      const user = await fb.auth().createUserWithEmailAndPassword(email, password)
      // TODO сделать возможным записывать остальную информацию по мимо email и password
      // @ts-ignore
      this.setUser(new User(user.user.uid))
      vmx.shared.setLoadingMut({ loading: false })
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
    }
  }

  @action async signInUser ({ email, password }: IUserData) {
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    try {
      const user = await fb.auth().signInWithEmailAndPassword(email, password)
      // @ts-ignore
      this.setUser(new User(user.user.uid))
      vmx.shared.setLoadingMut({ loading: false })
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
    }
  }
}
