<template>
  <q-page class="image-background">
    <div class="fixed-center login-form">
      <div class="">
        <q-card class="">
          <q-card-section>
            <q-form @submit.prevent="validateForm">
              <div class="">
                <p class="text-h6 text-center q-pb-sm">
                  {{ $t('login.title') }}
                </p>
              </div>
              <div class="">
                <q-input
                  id="username"
                  name="username"
                  type="email"
                  :label="$t('login.form.username')"
                  v-model="form.username"
                  v-validate="form_rules.username"
                  :data-vv-as="$t('login.form.username')"
                  :error="errors.has('username')"
                  :error-message="errors.first('username')">
                </q-input>
              </div>
              <div class="">
                <q-input
                  id="password"
                  name="password"
                  type="password"
                  :label="$t('login.form.password')"
                  v-model="form.password"
                  v-validate="form_rules.password"
                  :data-vv-as="$t('login.form.password')"
                  :error="errors.has('password')"
                  :error-message="errors.first('password')">
                </q-input>
              </div>
              <div class="text-center">
                <q-btn
                  type="submit"
                  :loading="loader"
                  :disable="errors.any()"
                  :label="$t('login.title')"
                  class="q-mt-md"
                  color="teal">
                  <template v-slot:loading>
                    <q-spinner></q-spinner>
                  </template>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { AuthService } from '../../services/AuthService'

export default {
  name: 'Login',
  $_veeValidate: {
    validator: 'new'
  },
  watch: {
    'form.username' (val) {
      if (this.errors.firstByRule('password', 'auth')) {
        this.errors.remove('password')
      }
    },
    'form.password' (val) {
      if (this.errors.firstByRule('username', 'auth')) {
        this.errors.remove('username')
      }
    }
  },
  methods: {
    ...mapActions('auth', ['setAuthStatus', 'setUserData', 'storeAuthCookie']),
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.login()
            return false
          }
        })
    },
    login () {
      this.loader = true
      AuthService.login(this.form)
        .then(response => {
          //
        })
        .catch(errors => {
          //
        })
        .then(() => {
          this.loader = false
        })
    }
  },
  data () {
    return {
      loader: false,
      form: {
        username: null,
        password: null,
        grant_type: 'password'
      },
      form_rules: {
        username: 'required|email|max:50',
        password: 'required|min:8',
        grant_type: 'required'
      }
    }
  },
  meta () {
    return {
      title: this.$t('login.title')
    }
  }
}
</script>

<style type="text/stylus" scoped>
.image-background {
  background-image: url("../../assets/custom/login-background.jpg");
}
.login-form {
  width: 350px;
}
</style>
