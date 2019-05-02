<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-subheader class="text-sm-left font-weight-bold" style="font-size: larger">All excursions</v-subheader>
        <v-divider></v-divider>
      </v-flex>
      <v-flex v-for="ad in ads" xs12 sm6 md4 :key="ad.id">
        <v-card>
          <v-carousel
            height="150"
            :cycle="false"
            hide-delimiters
            dark
          >
            <v-carousel-item
              v-for="(img,i) in ad.imageSrc"
              :key="i"
              :src="img"
            >
              <div class="ad-title">
                <v-btn flat class="white text-title " style="color: #FF5247">{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
          <v-card-actions>
            <span style="color: #FF5247" class="font-weight-bold ml-4" >{{ad.currency}}{{ ad.price }}</span>
            <v-spacer></v-spacer>
            <v-btn flat icon @click="ad.flag = !ad.flag">
              <v-icon v-if="!ad.flag" color="primary" >turned_in_not</v-icon>
              <v-icon v-else color="primary">turned_in</v-icon>
            </v-btn>
            <v-btn class="" flat icon>
              <v-icon color="warning" size="30" >star_border</v-icon>
              <span color="pl-2 warning" >{{ad.rating}}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import { vmx } from '@/store'

@Component
export default class Home extends Vue {
  @Provide() ads = vmx.ads.ads
}
</script>

<style scoped>
  .ad-title {
    /*position: ;*/
    /*bottom: 50px;*/
    position: absolute;
    padding-top: 112px;

    /*padding-right: 20px;*/
    /*width: 70px;*/
    /*height: 26px;*/
    /*left: 25px;*/
    /*bottom: 38px;*/
  }
  .text-title {
    font-size: small;
    color: #FF5247;
  }
</style>
