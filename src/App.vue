<template>
  <v-app>
    <v-toolbar dark color="primary" app>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Ad application</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
        >
          <v-icon left>bookmark_border</v-icon>
          Orders
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container class="pt-5">
        <v-layout>
          <v-flex class="text-xs-center">
            <v-btn  class="primary">
              Hello world
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
}
</script>
