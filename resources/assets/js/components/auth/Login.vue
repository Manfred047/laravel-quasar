<template>
    <q-modal v-model="show" >
            <form class="layout-padding" @submit.prevent="validateForm">
                <q-field
                        class="q-mb-md"
                        :error="errors.has('username')"
                        :error-label="errors.first('username')"
                        icon="perm identity"
                        autofocus>
                    <q-input
                            v-model="form.username"
                            name="username"
                            type="text"
                            ref="username"
                            v-validate="form_rules.username"
                            :data-vv-as="$t('login.form.username')"
                            :stack-label="$t('login.form.username')">
                    </q-input>
                </q-field>

                <q-field
                        :error="errors.has('password')"
                        :error-label="errors.first('password')"
                        icon="lock">
                    <q-input
                            v-model="form.password"
                            name="password"
                            type="password"
                            ref="password"
                            v-validate="form_rules.password"
                            :data-vv-as="$t('login.form.password')"
                            :stack-label="$t('login.form.password')">
                    </q-input>
                </q-field>

                <div class="row justify-center q-mt-md">
                    <q-btn
                            type="submit"
                            color="primary"
                            :disabled="errors.any()"
                            :label="$t('login.title')">
                    </q-btn>
                </div>

            </form>
        <q-inner-loading :visible="loader">
            <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
        </q-inner-loading>
    </q-modal>
</template>


<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        name: 'login',
        $_veeValidate: {
            validator: 'new'
        },
        computed: {
            ...mapState('auth', ['show_login']),
            show: {
                get () {
                    if (!this.show_login) {
                        this.clean();
                    }
                    return this.show_login;
                },
                set (value) {
                    this.showLogin(value);
                }
            }
        },
        watch: {
            "form.username"(val) {
                if (this.errors.firstByRule('password', 'auth')) {
                    this.errors.remove('password');
                }
            },
            "form.password"(val) {
                if (this.errors.firstByRule('username', 'auth')) {
                    this.errors.remove('username');
                }
            }
        },
        methods: {
            ...mapActions('auth', [
                'showLogin',
                'setAuthStatus',
                'reloadAuthStatus'
            ]),
            validateForm() {
                this.$validator.validateAll()
                    .then((result) => {
                        if (result) {
                            this.login();
                            return false;
                        }
                    }).catch(() => {});
            },
            login() {
                this.reloadAuthStatus();
                this.loader = true;
                this.$axios({
                    method: 'post',
                    url: this.$master.api('/oauth/token'),
                    data: this.form
                }).then((response) => {
                    this.setAuthStatus(true);
                    this.loader = false;
                    this.show = false;
                    this.$q.notify({
                        message: this.$t('login.success_login'),
                        type: 'positive'
                    });
                }).catch((errors) => {
                    this.loader = false;
                    let list = this.$master.hasErrors(errors);
                    if (list) {
                        let message = this.$master.getValue(errors, ['response', 'data', 'message']);
                        let type = message;
                        for (const key of Object.keys(list)) {
                            if (list.hasOwnProperty(key)) {
                                type = ((message === 'invalid_credentials') ? 'auth' : key);
                                this.errors.add(key, list[key][0], type);
                            }
                        }
                    }
                });
            },
            clean() {
                this.form = {
                    username: null,
                    password: null,
                    grant_type: 'password'
                };
                setTimeout(() => {
                    this.errors.clear();
                }, 100);
            }
        },
        data() {
            return {
                loader: false,
                form: {
                    username: null,
                    password: null,
                    grant_type: 'password'
                },
                form_rules: {
                    username: 'required|max:50',
                    password: 'required|min:8'
                }
            }
        }
    }
</script>

<style scoped>

</style>