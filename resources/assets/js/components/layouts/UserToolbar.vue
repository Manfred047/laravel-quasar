<template>
    <div>
        <q-toolbar color="blue-grey-14">
            <q-toolbar-title>
                <span>Laravel with Quasar Framework (SPA) by Manfred047</span>
            </q-toolbar-title>
            <q-btn flat
                   dense
                   label="Go to Welcome"
                   @click="$router.replace({name: 'welcome'})">
            </q-btn>
            <q-btn v-if="!isAuth"
                   flat
                   dense
                   label="Log in"
                   @click="showLogin(true)">
            </q-btn>
            <q-btn v-else
                   flat dense
                   :label="userInfo.username">
            </q-btn>
            <q-btn v-if="!isAuth"
                   flat
                   dense
                   label="Sign in"
                   @click="showRegister(true)">
            </q-btn>
            <q-btn v-else
                   flat
                   dense
                   label="Sign out"
                   @click="logout()">
            </q-btn>
        </q-toolbar>

        <login></login>
        <register></register>
    </div>
</template>

<script>
    import Login from '../auth/Login';
    import Register from '../auth/Register';
    import { mapActions, mapGetters} from 'vuex';
    export default {
        name: 'user-toolbar',
        components: {
            Login,
            Register
        },
        computed: {
            ...mapGetters('auth', ['isAuth', 'userInfo']),
        },
        methods: {
            ...mapActions('auth', ['showRegister', 'showLogin', 'logout'])
        }
    }
</script>