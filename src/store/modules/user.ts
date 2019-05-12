import { action, getter, Module, mutation, VuexModule } from 'vuex-class-component'
import { vmx } from '@/store'
import * as fb from 'firebase'
import { Ad } from '@/store/modules/ads'

class User {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string
  ) {}
}

interface IUserAuthData {
  email: string
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
}

@Module({ namespacedPath: 'user/' })
export class UserStore extends VuexModule {
  readonly userCollections:string = 'users'
  @getter user: User | null = null

  get isUserLoggedIn () {
    console.log(this.user)
    return this.user !== null
  }

  @mutation setUser (user: User) {
    this.user = user
  }

  @action async registerUser ({ email, password, firstName, lastName, phoneNumber }: IUserAuthData) {
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    try {
      const db = fb.firestore()
      const dbUser = db.collection(this.userCollections)
      const user = await fb.auth().createUserWithEmailAndPassword(email, password)
      // @ts-ignore
      const userId = user.user.uid
      this.setUser(new User(userId, firstName, lastName, phoneNumber))
      dbUser.doc(userId).set({ ...this.user })
        .then(() => { console.log('successful create user') })
        .catch(() => console.error('throw exception while creating user'))
      console.log('registerUser')
      vmx.shared.setLoadingMut({ loading: false })
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
    }
  }

  @action async signInUser ({ email, password }: IUserAuthData) {
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    try {
      const user = await fb.auth().signInWithEmailAndPassword(email, password)
      // @ts-ignore
      const doc = await fb.firestore().collection(this.userCollections).doc(user.user.uid).get()
      if (doc.exists) {
        this.setUser((doc.data() as User))
      } else {
        vmx.shared.setErrorMut({ error: 'No such user on db' })
      }
      vmx.shared.setLoadingMut({ loading: false })
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
    }
  }
  @action async logoutUser () {
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    try {
      await fb.auth().signOut()
      vmx.shared.setLoadingMut({ loading: false })
      console.log('signOut is success')
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
    }
  }
  @action async autoLoginUser (user: any) {
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    try {
      const doc = await fb.firestore().collection(this.userCollections).doc(user.uid).get()
      if (doc.exists) {
        this.setUser((doc.data() as User))
      } else {
        vmx.shared.setErrorMut({ error: 'No such user on db' })
      }
      vmx.shared.setLoadingMut({ loading: false })
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
    }
  }
}
