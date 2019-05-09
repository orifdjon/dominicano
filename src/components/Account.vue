<template>
  <v-btn
    @click="onLogout"
  >
    Logout
  </v-btn>
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
}
</script>

<style scoped>

</style>
