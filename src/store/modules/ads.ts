import { VuexModule, mutation, action, getter, Module } from 'vuex-class-component'
import { vmx } from '@/store'
import * as fb from 'firebase'

class Description {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public title: string,
    public subTitle: string,
    public text: string
  ) {}
}

interface ICreationAd {
  title: string
  description: Description
  imageSrc: string[]
  rating: number
  price: number
  currency: string
}

export class Ad {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public id: string,
    public title: string,
    public description: Description,
    public imageSrc: string[],
    public rating: number,
    public price: number,
    public flag: boolean = false,
    public currency: string = '$',
    public comments?: string[]
  ) {}
}

@Module({ namespacedPath: 'ads/' })
export class AdsStore extends VuexModule {
  private readonly AD_SCHEMA_NAME = 'ads'
  private _ads: Ad[] = []

  get ads () {
    return this._ads
  }

  @mutation createAdMut (ad: Ad) {
    this.ads.push(ad)
  }

  @mutation loadAdsMut (ads: Ad[]) {
    this._ads = ads
  }
  // TODO доделать
  @action async createAd (creationAd: ICreationAd) {
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    try {
      const docRef = fb.firestore().collection(this.AD_SCHEMA_NAME).add({ ...creationAd, flag: false })
      // this.ads.push(new Ad('1', creationAd.title, creationAd.description, creationAd.imageSrc, creationAd.rating, creationAd.price, ))
      vmx.shared.setLoadingMut({ loading: false })
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
      throw e
    }
  }

  @action async fetchAd () {
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    const result: Ad[] = []
    let favoritesAdIdList: string[] = []
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        // @ts-ignore
        favoritesAdIdList = vmx.storage.get(user.uid, [])
      }
    })
    try {
      const querySnapshot = await fb.firestore().collection(this.AD_SCHEMA_NAME).get()
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          // @ts-ignore
          const ad: ICreationAd = doc.data()
          let flag = false
          if (favoritesAdIdList.find(el => el === doc.id)) {
            flag = true
          }
          result.push(new Ad(doc.id, ad.title, ad.description, ad.imageSrc, ad.rating, ad.price, flag, ad.currency))
        }
      })
      this.loadAdsMut(result)
      vmx.shared.setLoadingMut({ loading: false })
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
      throw e
    }
  }

  get favoriteAds () : Ad[] {
    return vmx.ads.ads.filter(el => el.flag)
  }

  get totalCostAds () {
    return this._ads.filter(ad => ad.flag).reduce((sum, ad) => { return sum + ad.price }, 0)
  }

  get getAdById () {
    return (adId: string) => {
      return this._ads.find(ad => ad.id === adId)
    }
  }
}
