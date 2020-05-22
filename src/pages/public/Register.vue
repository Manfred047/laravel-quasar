<template>
  <q-page class="image-background">
    <div class="fixed-center register-form">
      <div class="">
        <q-card class="">
          <q-card-section>
            <validation-observer ref="observer" v-slot="{ valid }">
              <q-form v-on:submit.prevent>
                <div class="">
                  <p class="text-h6 text-center q-pb-sm">
                    {{ $t('register.title') }}
                  </p>
                </div>
                <validation-provider
                  vid="username"
                  :name="$t('register.form.username')"
                  :rules="form_rules.username"
                  v-slot="{ errors }">
                  <div class="">
                    <q-input
                      id="username"
                      name="username"
                      type="text"
                      :label="$t('register.form.username')"
                      v-model="form.username"
                      :error="hasErrors(errors)"
                      :error-message="errors[0]">
                    </q-input>
                  </div>
                </validation-provider>
                <validation-provider
                  vid="email"
                  :name="$t('register.form.email')"
                  :rules="form_rules.email"
                  v-slot="{ errors }">
                  <div class="">
                    <q-input
                      id="email"
                      name="email"
                      type="email"
                      :label="$t('register.form.email')"
                      v-model="form.email"
                      :error="hasErrors(errors)"
                      :error-message="errors[0]">
                    </q-input>
                  </div>
                </validation-provider>
                <validation-provider
                  vid="email_confirmation"
                  :name="$t('register.form.email_confirmation')"
                  :rules="form_rules.email_confirmation"
                  v-slot="{ errors }">
                  <div class="">
                    <q-input
                      id="email_confirmation"
                      name="email_confirmation"
                      type="email"
                      :label="$t('register.form.email_confirmation')"
                      v-model="form.email_confirmation"
                      :error="hasErrors(errors)"
                      :error-message="errors[0]">
                    </q-input>
                  </div>
                </validation-provider>
                <validation-provider
                  vid="password"
                  :name="$t('register.form.password')"
                  :rules="form_rules.password"
                  v-slot="{ errors }">
                  <div class="">
                    <q-input
                      id="password"
                      name="password"
                      type="password"
                      :label="$t('register.form.password')"
                      v-model="form.password"
                      :error="hasErrors(errors)"
                      :error-message="errors[0]">
                    </q-input>
                  </div>
                </validation-provider>
                <validation-provider
                  vid="password_confirmation"
                  :name="$t('register.form.password_confirmation')"
                  :rules="form_rules.password_confirmation"
                  v-slot="{ errors }">
                  <div class="">
                    <q-input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      :label="$t('register.form.password_confirmation')"
                      v-model="form.password_confirmation"
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
                    :label="$t('register.title')"
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
import { mapGetters } from 'vuex'
import { AuthService } from '../../services/AuthService'
import { master } from '../../helpers/master'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full'
import _ from 'lodash'

export default {
  name: 'Register',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  },
  methods: {
    hasErrors (errors) {
      return !_.isEmpty(errors)
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      this.register()
    },
    register () {
      this.loader = true
      AuthService.register(this.form)
        .then(response => {
          this.$q.notify({
            message: this.$t('register.success_register'),
            type: 'positive'
          })
          this.$router.replace({ name: 'public.login' })
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
      title: this.$t('page_titles.register_title')
    }
  }
}
</script>

<style scoped>
  .image-background {
    background-image: url('../../assets/custom/register-background.jpg');
  }
  .register-form {
    width: 350px;
  }
</style>
