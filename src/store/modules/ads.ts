import { VuexModule, mutation, action, getter, Module } from 'vuex-class-component'
import { vmx } from '@/store'

class Description {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public title: string,
    public subTitle: string,
    public text: string
  ) {}
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
    public currency: string = '$',
    public flag: boolean = false,
    public comments?: string[]
  ) {}
}

@Module({ namespacedPath: 'ads/' })
export class AdsStore extends VuexModule {
  @getter ads: Ad[] = [
    new Ad('1', 'dominicano', new Description('LOPESAN COSTA BAVARO RESORT SPA & CASINO', 'Playas de Bavaro', 'Роскошный отель IFA Villas Bavaro Resort & Spa 4* подарит необычайный комфорт и беззаботность своим гостям, предложив проживание по системе «Все включено».'), [
      'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVyzcND_OCQgKc1Asf.jpeg?alt=media&token=325c930e-6d8c-4758-98c9-57baba4f61f7',
      'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVEX4BpQUZ_C1NLdr7.jpeg?alt=media&token=6164f01f-893b-4ce3-b977-a4dc03f86d26'
    ], 5, 100),
    new Ad('2', 'costa-blanca', new Description('LOPESAN COSTA BAVARO RESORT SPA & CASINO', 'Playas de Bavaro', 'Роскошный отель IFA Villas Bavaro Resort & Spa 4* подарит необычайный комфорт и беззаботность своим гостям, предложив проживание по системе «Все включено».'), [
      'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVEX4BpQUZ_C1NLdr7.jpeg?alt=media&token=6164f01f-893b-4ce3-b977-a4dc03f86d26',
      'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVyzcND_OCQgKc1Asf.jpeg?alt=media&token=325c930e-6d8c-4758-98c9-57baba4f61f7'
    ], 4, 99),
    new Ad('3', 'mexico', new Description('LOPESAN COSTA BAVARO RESORT SPA & CASINO', 'Playas de Bavaro', 'Роскошный отель IFA Villas Bavaro Resort & Spa 4* подарит необычайный комфорт и беззаботность своим гостям, предложив проживание по системе «Все включено».'), [
      'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdQsdwT9N2S5bQ5v7s9.jpg?alt=media&token=acdbeac1-c9c7-488b-95ba-c637694170c6',
      'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdQskO6yaxsr9xKheot.jpg?alt=media&token=e0c62c8e-7d7b-4144-b482-72e3c6af6c22'
    ], 4, 200)
  ]

  @mutation createAd (ad: Ad) {
    this.ads.push(ad)
  }

  @mutation loadAds (ads: Ad[]) {
    this.ads = ads
  }

  get favoriteAds () {
    if (vmx.user.user !== null) {
      // @ts-ignore
      // eslint-disable-next-line eqeqeq
      return this.ads.filter(ad => vmx.user.user.favoritesIdList.find(el => el === ad.id) != undefined)
    }
    return []
  }

  get totalCostAds () {
    return this.ads.filter(ad => ad.flag).reduce((sum, ad) => { return sum + ad.price }, 0)
  }

  get getAdById () {
    return (adId: string) => {
      return this.ads.find(ad => ad.id === adId)
    }
  }
}
