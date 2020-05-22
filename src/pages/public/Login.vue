<template>
  <q-page class="image-background">
    <div class="fixed-center login-form">
      <div class="">
        <q-card class="">
          <q-card-section>
            <validation-observer ref="observer" v-slot="{ valid }">
              <q-form>
                <div class="">
                  <p class="text-h6 text-center q-pb-sm">
                    {{ $t('login.title') }}
                  </p>
                </div>
                <validation-provider
                  vid="username"
                  ref="username"
                  :name="$t('login.form.username')"
                  :rules="form_rules.username"
                  v-slot="{ errors }">
                  <div class="">
                    <q-input
                      id="username"
                      name="username"
                      type="text"
                      :label="$t('login.form.username')"
                      v-model="form.username"
                      :error="hasErrors(errors)"
                      :error-message="errors[0]">
                    </q-input>
                  </div>
                </validation-provider>
                <validation-provider
                  vid="password"
                  ref="password"
                  :name="$t('login.form.password')"
                  :rules="form_rules.password"
                  v-slot="{ errors }">
                  <div class="">
                    <q-input
                      id="password"
                      name="password"
                      type="password"
                      :label="$t('login.form.password')"
                      v-model="form.password"
                      :error="hasErrors(errors)"
                      :error-message="errors[0]">
                    </q-input>
                  </div>
                </validation-provider>
                <div class="text-center">
                  <q-btn
                    type="submit"
                    :loading="loader"
                    :disable="!valid"
                    :label="$t('login.title')"
                    class="q-mt-md"
                    color="teal"
                    @click="submit">
                    <template v-slot:loading>
                      <q-spinner></q-spinner>
                    </template>
                  </q-btn>
                </div>
              </q-form>
            </validation-observer>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { AuthService } from '../../services/AuthService'
import { master } from '../../helpers/master'
import _ from 'lodash'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full'

export default {
  name: 'Login',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  watch: {
    'form.username' (val) {
      if (this.$refs.observer.$data.isAuth) {
        this.$refs.observer.$data.isAuth = false
        this.$refs.password.reset()
      }
    },
    'form.password' (val) {
      if (this.$refs.observer.$data.isAuth) {
        this.$refs.observer.$data.isAuth = false
        this.$refs.username.reset()
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  },
  methods: {
    ...mapActions('auth', ['setAuthStatus', 'setUserData', 'storeToken']),
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      this.login()
    },
    hasErrors (errors) {
      return !_.isEmpty(errors)
    },
    login () {
      this.loader = true
      AuthService.login(this.form)
        .then(response => {
          this.storeToken(response)
          this.setAuthStatus(true)
          this.setUserData(_.get(response, ['data', 'user_data'], {}))
          const redirect = _.get(this.$route, ['query', 'redirect'])
          if (redirect) {
            this.$router.replace(redirect)
          } else {
            this.$router.replace({ name: 'auth.user' })
          }
        })
        .catch(errors => {
          const errArray = master.hasErrors(errors)
          if (errArray) {
            master.setErrors(this.$refs.observer, errArray)
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
        password: null,
        grant_type: 'password'
      },
      form_rules: {
        username: 'required|max:50',
        password: 'required|min:8',
        grant_type: 'required'
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
      title: this.$t('page_titles.login_title')
    }
  }
}
</script>

<style scoped>
.image-background {
  background-image: url('../../assets/custom/login-background.jpg');
}
.login-form {
  width: 350px;
}
</style>
