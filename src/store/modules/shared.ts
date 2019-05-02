import { VuexModule, mutation, action, getter, Module } from 'vuex-class-component'

@Module({ namespacedPath: 'shared/' })
export class SharedStore extends VuexModule {
  @getter loading = false
  @getter error = null

  @mutation setLoadingMut ({ loading }: IShared) {
    this.loading = loading
  }

  @mutation setErrorMut ({ error }: IShared) {
    this.error = error
  }

  @mutation clearErrorMut () {
    this.error = null
  }

  @action async setLoading (payload: IShared) {
    this.setLoadingMut(payload)
  }

  @action async setError (payload: IShared) {
    this.setErrorMut(payload)
  }

  @action async clearError () {
    this.clearErrorMut()
  }
}

interface IShared {
  loading: boolean
  error: any
}
