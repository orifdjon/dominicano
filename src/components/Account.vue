<template>
  <div>
    <v-btn
      @click="onLogout"
    >
      Logout
    </v-btn>
    <v-btn
      @click="addAd"
    >
      Add ad
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { vmx } from '@/store'

@Component
export default class Account extends Vue {
  onLogout () {
    vmx.user.logoutUser()
      .then(() => this.$router.push('/account'))
  }

  addAd () {
    vmx.ads.createAd({
      title: 'Dominicano',
      description: {
        title: 'LOPESAN COSTA BAVARO RESORT SPA & CASINO',
        subTitle: 'Playas de Bavaro',
        text: 'Роскошный отель IFA Villas Bavaro Resort & Spa 4* подарит необычайный комфорт и беззаботность своим гостям, предложив проживание по системе «Все включено».'
      },
      imageSrc: [
        'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVyzcND_OCQgKc1Asf.jpeg?alt=media&token=325c930e-6d8c-4758-98c9-57baba4f61f7',
        'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVEX4BpQUZ_C1NLdr7.jpeg?alt=media&token=6164f01f-893b-4ce3-b977-a4dc03f86d26'
      ],
      rating: 4.2,
      price: 127,
      currency: '$'
    })
    vmx.ads.createAd({
      title: 'Dominicano',
      description: {
        title: 'LOPESAN COSTA BAVARO RESORT SPA & CASINO',
        subTitle: 'Playas de Bavaro',
        text: 'Роскошный отель IFA Villas Bavaro Resort & Spa 4* подарит необычайный комфорт и беззаботность своим гостям, предложив проживание по системе «Все включено».'
      },
      imageSrc: [
        'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVyzcND_OCQgKc1Asf.jpeg?alt=media&token=325c930e-6d8c-4758-98c9-57baba4f61f7',
        'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdVEX4BpQUZ_C1NLdr7.jpeg?alt=media&token=6164f01f-893b-4ce3-b977-a4dc03f86d26'
      ],
      rating: 4.2,
      price: 127,
      currency: '$'
    })
  }
}
</script>

<style scoped>

</style>
