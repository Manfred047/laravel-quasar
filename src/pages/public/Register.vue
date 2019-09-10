<template>
  <q-page class="image-background">
    <div class="fixed-center register-form">
      <div class="">
        <q-card class="">
          <q-card-section>
            <q-form @submit.prevent="validateForm">
              <div class="">
                <p class="text-h6 text-center q-pb-sm">
                  {{ $t('register.title') }}
                </p>
              </div>
              <div class="">
                <q-input
                  id="username"
                  name="username"
                  type="text"
                  :label="$t('register.form.username')"
                  v-model="form.username"
                  v-validate="form_rules.username"
                  :data-vv-as="$t('register.form.username')"
                  :error="errors.has('username')"
                  :error-message="errors.first('username')">
                </q-input>
              </div>
              <div class="">
                <q-input
                  ref="email"
                  id="email"
                  name="email"
                  type="email"
                  :label="$t('register.form.email')"
                  v-model="form.email"
                  v-validate="form_rules.email"
                  :data-vv-as="$t('register.form.email')"
                  :error="errors.has('email')"
                  :error-message="errors.first('email')">
                </q-input>
              </div>
              <div class="">
                <q-input
                  id="email_confirmation"
                  name="email_confirmation"
                  type="email"
                  :label="$t('register.form.email_confirmation')"
                  v-model="form.email_confirmation"
                  v-validate="form_rules.email_confirmation"
                  :data-vv-as="$t('register.form.email_confirmation')"
                  :error="errors.has('email_confirmation')"
                  :error-message="errors.first('email_confirmation')">
                </q-input>
              </div>
              <div class="">
                <q-input
                  ref="password"
                  id="password"
                  name="password"
                  type="password"
                  :label="$t('register.form.password')"
                  v-model="form.password"
                  v-validate="form_rules.password"
                  :data-vv-as="$t('register.form.password')"
                  :error="errors.has('password')"
                  :error-message="errors.first('password')">
                </q-input>
              </div>
              <div class="">
                <q-input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  :label="$t('register.form.password_confirmation')"
                  v-model="form.password_confirmation"
                  v-validate="form_rules.password_confirmation"
                  :data-vv-as="$t('register.form.password_confirmation')"
                  :error="errors.has('password_confirmation')"
                  :error-message="errors.first('password_confirmation')">
                </q-input>
              </div>
              <div class="text-center">
                <q-btn
                  type="submit"
                  :loading="loader"
                  :disable="errors.any()"
                  :label="$t('register.title')"
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
import { mapGetters } from 'vuex'
import { AuthService } from '../../services/AuthService'
import { master } from '../../helpers/master'

export default {
  name: 'Register',
  $_veeValidate: {
    validator: 'new'
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  },
  methods: {
    validateForm () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.register()
            return false
          }
        })
    },
    register () {
      this.loader = true
      AuthService.register(this.form)
        .then(response => {
          this.$q.notify({
            message: this.$t('register.success_register'),
            type: 'positive'
          })
          this.$router.replace({ name: 'public.index' })
        })
        .catch(errors => {
          let errArray = master.hasErrors(errors)
          if (errArray) {
            master.setErrors(this.errors, errArray)
          }
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
        email: null,
        email_confirmation: null,
        password: null,
        password_confirmation: null
      },
      form_rules: {
        username: 'required|alpha_num|max:50',
        email: 'required|email|max:50',
        email_confirmation: 'required|confirmed:email',
        password: {
          required: true,
          min: 8,
          regex: /(^[\S]{8,}$)/
        },
        password_confirmation: 'required|confirmed:password'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.isAuth) {
        vm.$router.replace({ name: 'public.index' })
      }
    })
  },
  meta () {
    return {
      title: this.$t('register.title')
    }
  }
}
</script>

<style scoped>
  .image-background {
    background-image: url('../../assets/custom/login-background.jpg');
  }
  .register-form {
    width: 350px;
  }
</style>
