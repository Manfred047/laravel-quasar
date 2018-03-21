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
                            v-validate="formRules.username"
                            stack-label="User or Email">
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
                            v-validate="formRules.password"
                            stack-label="Password">
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
    import { mapActions, mapState } from 'vuex';
    export default {
        name: 'login',
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
                        message: 'Success login',
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
                    password: null,
                    grant_type: 'password'
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
                    username: null,
                    password: null,
                    grant_type: 'password'
                },
                formRules: {
                    username: 'required|max:50',
                    password: 'required|min:8'
                }
            }
        }
    }
</script>

<style scoped>

</style>