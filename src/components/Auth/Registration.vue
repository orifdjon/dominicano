<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                name="firstName"
                label="Имя"
                type="text"
                v-model="firstName"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                name="secondName"
                label="Фамилия"
                type="text"
                v-model="lastName"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                name="phoneNumber"
                label="Номер Телефона"
                type="tel"
                v-model="phoneNumber"
                required
                placeholder="+7"
                mask="phone"
              ></v-text-field>
              <v-text-field
                name="email"
                label="Email"
                type="email"
                v-model="email"
                required
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                name="password"
                label="Пароль"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                @click:append="showPassword = !showPassword"
                required
                :counter="6"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                name="confirm-password"
                label="Проверка пароля"
                :type="showConfPassword ? 'text' : 'password'"
                :counter="6"
                required
                :append-icon="showConfPassword ? 'visibility' : 'visibility_off'"
                :rules="confirmPasswordRules"
                v-model="confirmPassword"
                @click:append="showConfPassword = !showConfPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!valid || loading"
              @click="onSubmit"
            >
              Создать аккаунт
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator'
import { vmx } from '@/store'

@Component({
  data () {
    return {
      nameRules: [
        (v: any) => (v && v.length <= 17) || 'Name must be equal or less than 17 characters'
      ],
      emailRules: [
        (v: any) => !!v || 'E-mail is required',
        (v: any) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v: any) => !!v || 'Password is required',
        (v: any) => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
      ],
      confirmPasswordRules: [
        (v: any) => !!v || 'Confirm password is required',
        (v: any) => {
          return v === this.$data.password || 'Password should match'
        }
      ]
    }
  }
})
export default class Registration extends Vue {
  @Provide() firstName: string = ''
  @Provide() lastName: string = ''
  @Provide() phoneNumber: string = ''
  @Provide() valid: boolean = false
  @Provide() email: string = ''
  @Provide() password: string = ''
  @Provide() confirmPassword: any = ''
  @Provide() showPassword: boolean = false
  @Provide() showConfPassword: boolean = false

  get loading () {
    return vmx.shared.loading
  }
  onSubmit () {
    if ((this.$refs.form as any).validate()) {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.password
      }
      console.log(user)
      vmx.user.registerUser(user)
        .then(() => this.$router.push('/'))
    }
  }
}
</script>

<style scoped>

</style>
