<template>
    <q-modal v-model="show">
        <form class="layout-padding" @submit.prevent="validateForm">
            <q-field
                    autofocus
                    class="q-mb-md"
                    :error="errors.has('username')"
                    :error-label="errors.first('username')"
                    icon="perm identity">
                <q-input name="username"
                         type="text"
                         v-model="form.username"
                         v-validate="formRules.username"
                         stack-label="Username">
                </q-input>
            </q-field>
            <q-field
                    class="q-mb-md"
                    :error="errors.has('email')"
                    :error-label="errors.first('email')"
                    icon="mail">
                <q-input name="email"
                         type="email"
                         v-model="form.email"
                         v-validate="formRules.email"
                         stack-label="email">
                </q-input>
            </q-field>

            <q-field
                    inset="icon"
                    :error="errors.has('email_confirmation')"
                    :error-label="errors.first('email_confirmation')"
                    class="q-mb-md">
                <q-input name="email_confirmation"
                         type="email"
                         v-model="form.email_confirmation"
                         v-validate="formRules.email_confirmation"
                         stack-label="Confirm email">
                </q-input>
            </q-field>

            <q-field
                    class="q-mb-md"
                    :error="errors.has('password')"
                    :error-label="errors.first('password')"
                    icon="lock">
                <q-input name="password"
                         type="password"
                         v-model="form.password"
                         v-validate="formRules.password"
                         stack-label="Password">
                </q-input>
            </q-field>

            <q-field inset="icon"
                     :error="errors.has('password_confirmation')"
                     :error-label="errors.first('password_confirmation')">
                <q-input name="password_confirmation"
                         type="password"
                         v-model="form.password_confirmation"
                         v-validate="formRules.password_confirmation"
                         stack-label="Confirm password">
                </q-input>
            </q-field>
            <div class="row justify-center q-mt-md">
                <q-btn type="submit"
                       color="primary"
                       :disabled="errors.any()"
                       label="Log in">
                </q-btn>
            </div>
        </form>
        <q-inner-loading :visible="loader">
            <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
        </q-inner-loading>
    </q-modal>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'register',
        computed: {
            ...mapState('auth', ['show_register']),
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
                        message: 'Success sign in',
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
                    email: null,
                    email_confirmation: null,
                    password: null,
                    password_confirmation: null,
                    username: null
                };
                setTimeout(() => {
                    this.errors.clear();
                }, 100);
            },
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
                formRules: {
                    email: 'required|email|max:50',
                    email_confirmation: 'required|confirmed:email',
                    password: {
                        required: true,
                        min: 8,
                        regex: /(^[\S]{8,}$)/
                    },
                    password_confirmation: 'required|confirmed:password',
                    username: 'required|alpha_num|max:50'
                }
            }
        }
    }
</script>

<style scoped>

</style>