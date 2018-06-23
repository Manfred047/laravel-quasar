<template>
    <q-modal v-model="show">
        <form class="layout-padding" @submit.prevent="validateForm">
            <q-field
                    class="q-mb-md"
                    icon="perm identity"
                    autofocus
                    :error="errors.has('username')"
                    :error-label="errors.first('username')">
                <q-input
                        v-model="form.username"
                        name="username"
                        type="text"
                        v-validate="form_rules.username"
                        :data-vv-as="$t('register.form.username')"
                        :stack-label="$t('register.form.username')">
                </q-input>
            </q-field>

            <q-field
                    class="q-mb-md"
                    :error="errors.has('email')"
                    :error-label="errors.first('email')"
                    icon="email">
                <q-input
                        v-model="form.email"
                        ref="email"
                        name="email"
                        type="email"
                        v-validate="form_rules.email"
                        :data-vv-as="$t('register.form.email')"
                        :stack-label="$t('register.form.email')">
                </q-input>
            </q-field>

            <q-field
                    class="q-mb-md"
                    :error="errors.has('email_confirmation')"
                    :error-label="errors.first('email_confirmation')"
                    icon="email">
                <q-input
                        v-model="form.email_confirmation"
                        name="email_confirmation"
                        type="email"
                        v-validate="form_rules.email_confirmation"
                        :data-vv-as="$t('register.form.email_confirmation')"
                        :stack-label="$t('register.form.email_confirmation')">
                </q-input>
            </q-field>

            <q-field
                    class="q-mb-md"
                    :error="errors.has('password')"
                    :error-label="errors.first('password')"
                    icon="lock">
                <q-input
                        class="q-mb-md"
                        v-model="form.password"
                        ref="password"
                        name="password"
                        type="password"
                        v-validate="form_rules.password"
                        :data-vv-as="$t('register.form.password')"
                        :stack-label="$t('register.form.password')">
                </q-input>
            </q-field>

            <q-field
                    class="q-mb-md"
                    :error="errors.has('password_confirmation')"
                    :error-label="errors.first('password_confirmation')"
                    icon="lock">
                <q-input
                        v-model="form.password_confirmation"
                        name="password_confirmation"
                        type="password"
                        v-validate="form_rules.password_confirmation"
                        :data-vv-as="$t('register.form.password_confirmation')"
                        :stack-label="$t('register.form.password_confirmation')">
                </q-input>
            </q-field>
            <!--
            <div class="row justify-center q-mt-md">
                <q-field
                        class="q-mb-md"
                        :error="errors.has('recaptcha')"
                        :error-label="errors.first('recaptcha')">
                    <vue-recaptcha
                            ref="recaptcha"
                            :data-vv-as="$t('register.form.recaptcha')"
                            @verify="onVerify"
                            @expired="onExpired"
                            :sitekey="$master.getInfo('recaptcha')"
                            class="q-mt-md">
                    </vue-recaptcha>
                </q-field>
            </div>
            -->
            <div class="row justify-center q-mt-md">
                <q-btn type="submit"
                       color="primary"
                       :disabled="errors.any()"
                       :label="$t('register.title')">
                </q-btn>
            </div>

        </form>
        <q-inner-loading :visible="loader">
            <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
        </q-inner-loading>
    </q-modal>
</template>


<script>
    //require(`https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl=es`);
    import { mapState, mapActions,mapGetters } from 'vuex';
    import VueRecaptcha from 'vue-recaptcha';
    export default {
        name: 'register',
        $_veeValidate: {
            validator: 'new'
        },
        components: {
            //VueRecaptcha
        },
        mounted () {
            //this.$master.setRecaptchaLang(this.$refs.recaptcha.$el, this.lang);
        },
        computed: {
            ...mapState('auth', ['show_register']),
            ...mapGetters('lang', ['lang']),
            show: {
                get () {
                    if (!this.show_register) {
                        this.clean();
                    }
                    return this.show_register;
                },
                set (value) {
                    this.showRegister(value);
                }
            }
        },
        watch: {
            lang (value) {
                //this.$master.setRecaptchaLang(this.$refs.recaptcha.$el, value);
            }
        },
        methods: {
            ...mapActions('auth', ['showRegister', 'setAuthStatus', 'reloadAuthStatus']),
            validateForm() {
                this.$validator.validateAll()
                    .then((result) => {
                        if (result) {
                            this.register();
                            return false;
                        }
                    }).catch(() => {});
            },
            register() {
                this.loader = true;
                this.$axios({
                    method: 'post',
                    url: this.$master.api('/register'),
                    data: this.form
                }).then((response) => {
                    this.loader = false;
                    this.show = false;
                    if (response.data.success === 'ok') {
                        this.reloadAuthStatus();
                        this.setAuthStatus(true);
                    }
                    this.$q.notify({
                        message: this.$t('register.success_register'),
                        type: 'positive'
                    });
                }).catch((errors) => {
                    this.loader = false;
                    if (errors) {
                        let errorList = errors.errors;
                        for (const key of Object.keys(errorList)) {
                            if (errorList.hasOwnProperty(key)) {
                                this.errors.add(key, errorList[key][0], key);
                            }
                        }
                    }
                });
            },
            clean() {
                this.form = {
                    username: null,
                    email: null,
                    email_confirmation: null,
                    password: null,
                    password_confirmation: null,
                    recaptcha: null
                };
                setTimeout(() => {
                    this.errors.clear();
                }, 100);
            },
            onVerify (response) {
                this.form.recaptcha = response;
            },
            onExpired () {
                this.form.recaptcha = null;
            },
            resetRecaptcha () {
                if ('recaptcha' in this.$refs) {
                    this.$refs.recaptcha.reset();
                }
            }
        },
        data() {
            return {
                loader: false,
                form: {
                    email: null,
                    email_confirmation: null,
                    password: null,
                    password_confirmation: null,
                    username: null
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
                    password_confirmation: 'required|confirmed:password',
                    //recaptcha: 'required' // Uncomment if you need
                }
            }
        }
    }
</script>

<style scoped>

</style>