<template>
  <v-app>
    <v-toolbar
      v-if="$vuetify.breakpoint.smAndUp"
      app
    >
      <v-toolbar-title>
        <v-btn
          to="/"
          class="pointer"
          :ripple="{ class: 'green--text' }"
          flat
          style="color: #FF5247"
        >
          TodoGood
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items >
        <v-btn
          v-for="link in links"
          v-show="link.title !== 'Home'"
          :key="link.title"
          :to="link.url"
          color="primary"
          flat
        >
          <v-badge
          rigth
          color="red"
          v-if="link.title === 'Favorites' && (favoriteAdsLength !== 0)"
          >
            <span slot="badge">{{ favoriteAdsLength }}</span>
          </v-badge>
          <v-icon left>{{ link.icon }}</v-icon>
          <span >{{ link.title }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-toolbar
      color="#FFFFFF"
      height="50px"
      class="hidden-sm-and-up"
      app
    >
      <v-btn
        icon
      >
        <v-icon rigth color="primary">drag_handle</v-icon>
      </v-btn>
      <v-toolbar-title
        class="text-sm-center"
        style="color: #FF5247"
      >
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
      >
        <v-icon rigth color="primary">more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <v-bottom-nav
      class="hidden-sm-and-up"
      :value="true"
      shift
      height="95px"
      app
    >
      <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          color="primary"
          flat
      >
        <span>{{ link.title }}</span>
        <v-icon >{{ link.icon }}</v-icon>
        <v-badge
          right
          color="red"
          v-if="link.title === 'Favorites' && (favoriteAdsLength !== 0)"
        >
          <span slot="badge">{{ favoriteAdsLength }}</span>
        </v-badge>
      </v-btn>
    </v-bottom-nav>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { vmx } from '@/store'
import { Link } from '@/types'

@Component
export default class App extends Vue {
  get title () : string {
    return vmx.general.title
  }
  get favoriteAdsLength () : number {
    return vmx.ads.favoriteAds.length
  }
  get links () : Link[] {
    return [
      { title: 'Home', icon: 'home', url: '/' },
      { title: 'Services', icon: 'comment', url: '/services' },
      { title: 'Favorites', icon: 'bookmark', url: '/favorites' },
      { title: 'Contact us', icon: 'call', url: '/contact_us' },
      { title: 'Account', icon: 'person', url: '/account' }
    ]
  }
}
</script>

<style scoped>
</style>
