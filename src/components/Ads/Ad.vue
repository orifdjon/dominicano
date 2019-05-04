<template>
  <div>
    <v-container  fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-subheader style="font-size: x-large; color: #6644BB">{{ ad.title }}</v-subheader>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
    </v-container>
    <v-carousel
      :height="carouselHeight"
      hide-delimiters
    >
      <v-carousel-item v-for="a in ad.imageSrc" :key="a" :src="a" >
      </v-carousel-item>
    </v-carousel>
    <v-container fluid align-end>
      <v-layout >
        <v-flex xs2>
          <span class="price font-weight-bold">Price:</span>
        </v-flex>
      </v-layout>
      <v-layout align-start justify-space-between row fill-height>
        <v-flex xs6 md6 px-2 >
          <span style="font-size: xx-large; color: #4822A4;" class="font-weight-bold">${{ ad.price }}</span>
        </v-flex>
        <v-flex xs0 md3 >
        </v-flex>
        <v-flex xs6 md3 >
          <v-btn
            class="book"
            block dark
            color="#4822A4"
            style="border-radius: 20px 1px 1px 20px;"
          >
            Book
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { vmx } from '@/store'

@Component
export default class Ad extends Vue {
  @Prop() id!: string
  @Provide() carouselHeight: string = this.$vuetify.breakpoint.smAndUp ? '350px' : '250px'
  @Provide() s = 2
  get ad () {
    return vmx.ads.getAdById(this.id)
  }
}
</script>

<style scoped>
  .price {
    font-size: 16px;
    line-height: 15px;
    color: #4822A4;
  }
</style>
