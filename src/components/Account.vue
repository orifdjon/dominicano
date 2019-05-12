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
      title: 'Guadeloupe',
      description: {
        title: 'LOPESAN COSTA BAVARO RESORT SPA & CASINO',
        subTitle: 'Playas de Bavaro',
        text: 'Роскошный отель IFA Villas Bavaro Resort & Spa 4* подарит необычайный комфорт и беззаботность своим гостям, предложив проживание по системе «Все включено».'
      },
      imageSrc: [
        'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdQsdwT9N2S5bQ5v7s9.jpg?alt=media&token=acdbeac1-c9c7-488b-95ba-c637694170c6',
        'https://firebasestorage.googleapis.com/v0/b/udemy-ads.appspot.com/o/ads%2F-LdQskO6yaxsr9xKheot.jpg?alt=media&token=e0c62c8e-7d7b-4144-b482-72e3c6af6c22'
      ],
      rating: 4.3,
      price: 117,
      currency: '$'
    })
  }
}
</script>

<style scoped>

</style>
