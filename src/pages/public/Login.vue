<template>
  <div class="q-pa-md">
    <div class="flex-center q-pt-lg">
      <div class="row">
        <div class="col-lg-3 col-md-12"></div>
        <div class="col-lg-6 col-md-12 width-100">
          <q-card class="">
            <q-card-section>
              <div class="text-h-6 text-center q-pb-sm">
                {{ $t('login.title') }}
              </div>
              <q-form @submit.prevent="validateForm">
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
              </q-form>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-3 col-md-12"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      //
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

<style scoped>
.width-100 {
  width: 100%;
}
</style>
