<template>
  <div>
    <v-container fluid>
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
      <v-carousel-item v-for="a in ad.imageSrc" :key="a" :src="a">
      </v-carousel-item>
    </v-carousel>
    <v-container
      fluid
      grid-list-md
      class="pa-0 mp-0"
    >
      <v-layout>

      </v-layout>
      <v-layout align-start justify-space-between row fill-height wrap>
        <v-flex xs5 md6 px-4 mt-0>
          <v-container>
            <v-layout column justify-center fill-height>
              <v-flex class="">
                <span class="price font-weight-bold" style="font-size: medium">Price:</span>
              </v-flex>
              <v-flex class="">
                <span style="font-size: 35px; color: #4822A4;" class="font-weight-bold">${{ ad.price }}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs7 md3 mt-1 class="text-xs-right">
          <v-btn
            :block="toggleBook"
            ref="book"
            dark
            :color="bookBtnColor"
            style="border-radius: 80px 1px 1px 80px;  height: 85px;"
            @click="isBook = !isBook"
          >
            <span v-if="toggleBook">Забронировать</span>
            <v-icon v-if="!toggleBook">done</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout class="ml-3 mr-3 align-center" >
        <v-flex xs3 md3 class="text-xs-center" >
          <v-icon size="2.2em" color="warning">grade</v-icon>
          <span style="font-size: 18px; color: #FF5247;" class="">{{ ad.rating }}</span>
        </v-flex>
        <v-flex xs3 md3 class="text-xs-start">
          <v-icon size="2em" color="warning">mode_comment</v-icon>
          <span style="font-size: 18px; color: #FF5247;" class="pl-1 ">50</span>
        </v-flex>
      </v-layout>
      <v-divider class="ml-3 mr-3 pl-3 pl-3 dived"></v-divider>
      <v-layout ml-3 mr-3 align-center wrap row>
        <v-flex xs12 md12><span class=font-weight-bold>Доступно по дням:</span></v-flex>
      </v-layout>
      <v-layout ml-1 mr-1 text-xs-center>
        <v-flex>Пн</v-flex>
        <v-flex>Вт</v-flex>
        <v-flex>Ср</v-flex>
        <v-flex>Чт</v-flex>
        <v-flex>Пт</v-flex>
        <v-flex>Сб</v-flex>
        <v-flex>Вс</v-flex>
      </v-layout>
      <v-layout ml-3 mr-3 wrap>
        <v-flex xs12>
          <v-btn
            dark
            block
            @click="isInFavourites = !isInFavourites"
            :outline="toggleInFavourites"
            color="warning"
          >
            <div v-if="!toggleInFavourites">
              <v-icon>turned_in_not</v-icon>
              <span>Добавить в избранное</span>
            </div>
            <div v-if="toggleInFavourites">
              <v-icon>turned_in</v-icon>
              <span>Убрать из избранного</span>
            </div>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn
            black
            outline
            block
            color="primary"
          >
            <v-icon >mode_comment</v-icon>
            <span>Перейти к отзывам</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout ma-2 pa-2 wrap>
        <v-flex xs12>
          <span style="color: #4822A4; font-size: 18px;" class="font-weight-bold">{{ ad.description.title }}</span>
        </v-flex>
        <v-flex xs12>
          <span style="font-size: 16px; color: #FF5247; font-family: Proxima Nova">{{ ad.description.subTitle }}</span>
        </v-flex>
        <v-flex xs12>
          <span style="font-size: 16px; font-family: Proxima Nova">{{ ad.description.text }} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, nisi.</span>
        </v-flex>
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
    @Provide() carouselHeight: string = this.$vuetify.breakpoint.smAndUp ? '375px' : '250px'

    @Provide() isBook: boolean = false

    @Provide() isInFavourites: boolean = false

    get ad () {
      return vmx.ads.getAdById(this.id)
    }

    get bookBtnColor (): string {
      if (this.isBook) {
        return '#64BC64'
      } else {
        return '#4822A4'
      }
    }

    get toggleBook (): boolean {
      return !this.isBook
    }

    get toggleInFavourites (): boolean {
      return !this.isInFavourites
    }
}
</script>

<style scoped>
  .price {
    font-size: 16px;
    line-height: 15px;
    color: #4822A4;
    height: 300px;
  }
  .dived {
    border-color: rgba(0,0,0,0.12) !important;
  }
  .bord {
    border: 1px solid;
  }
</style>
