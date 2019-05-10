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
  private readonly AD_COLLECTION_NAME = 'ads'
  private _ads: Ad[] = []

  get ads () {
    return this._ads
  }
  // [
  //   new Ad('1', 'dominicano', new Description('LOPESAN COSTA BAVARO RESORT SPA & CASINO', 'Playas de Bavaro', 'Роскошный отель IFA Villas Bavaro Resort & Spa 4* подарит необычайный комфорт и беззаботность своим гостям, предложив проживание по системе «Все включено».'), [
  //     'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVyzcND_OCQgKc1Asf.jpeg?alt=media&token=325c930e-6d8c-4758-98c9-57baba4f61f7',
  //     'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVEX4BpQUZ_C1NLdr7.jpeg?alt=media&token=6164f01f-893b-4ce3-b977-a4dc03f86d26'
  //   ], 5, 100),
  //   new Ad('2', 'costa-blanca', new Description('LOPESAN COSTA BAVARO RESORT SPA & CASINO', 'Playas de Bavaro', 'Роскошный отель IFA Villas Bavaro Resort & Spa 4* подарит необычайный комфорт и беззаботность своим гостям, предложив проживание по системе «Все включено».'), [
  //     'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVEX4BpQUZ_C1NLdr7.jpeg?alt=media&token=6164f01f-893b-4ce3-b977-a4dc03f86d26',
  //     'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVyzcND_OCQgKc1Asf.jpeg?alt=media&token=325c930e-6d8c-4758-98c9-57baba4f61f7'
  //   ], 4, 99),
  //   new Ad('3', 'mexico', new Description('LOPESAN COSTA BAVARO RESORT SPA & CASINO', 'Playas de Bavaro', 'Роскошный отель IFA Villas Bavaro Resort & Spa 4* подарит необычайный комфорт и беззаботность своим гостям, предложив проживание по системе «Все включено».'), [
  //     'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdQsdwT9N2S5bQ5v7s9.jpg?alt=media&token=acdbeac1-c9c7-488b-95ba-c637694170c6',
  //     'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdQskO6yaxsr9xKheot.jpg?alt=media&token=e0c62c8e-7d7b-4144-b482-72e3c6af6c22'
  //   ], 4, 200)
  // ]
  set ads (ads) {
    this._ads = ads
  }

  @mutation createAdMut (ad: Ad) {
    this.ads.push(ad)
  }

  @mutation loadAdsMut (ads: Ad[]) {
    this.ads = ads
  }

  @action async createAd (creationAd: ICreationAd) {
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    try {
      const docRef = fb.firestore().collection(this.AD_COLLECTION_NAME).add({ ...creationAd, flag: false })
      // this.ads.push(new Ad('1', creationAd.title, creationAd.description, creationAd.imageSrc, creationAd.rating, creationAd.price, ))
      vmx.shared.setLoadingMut({ loading: false })
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
    }
  }

  @action async fetchAd () {
    let i = 0
    let flag = false
    vmx.shared.clearErrorMut()
    vmx.shared.setLoadingMut({ loading: true })
    try {
      const querySnapshot = await fb.firestore().collection(this.AD_COLLECTION_NAME).get()
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          const ad = doc.data()
          // @ts-ignore
          if (vmx.user.isUserLoggedIn && vmx.user.user.favoritesIdList.find(el => el === ad.id)) {
            console.log('0.1')
            flag = true
          }
          this._ads[i] = new Ad(
            doc.id, ad.title, ad.description, ad.imageSrc, ad.rating, ad.price, flag, '$'
          )
        }
        i++
      })
      console.log(this._ads)
      vmx.shared.setLoadingMut({ loading: false })
    } catch (e) {
      vmx.shared.setLoadingMut({ loading: false })
      vmx.shared.setErrorMut({ error: e.message })
    }
  }

  get favoriteAds () {
    if (vmx.user.user !== null) {
      console.log('filter')
      // @ts-ignore
      // eslint-disable-next-line eqeqeq
      return this._ads.filter(ad => vmx.user.user.favoritesIdList.find(el => el === ad.id) != undefined)
    }
    return []
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
