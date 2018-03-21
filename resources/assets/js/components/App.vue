<template>
    <q-layout view="lHh Lpr fff">
        <q-layout-header>
            <router-view name="top-menu"></router-view>
        </q-layout-header>
        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        name: "app",
        created() {
            this.getAuthStatus();
        },
        watch: {
            auth(value) {
                if (value) {
                    this.setUserInfo();
                }
            }
        },
        computed: {
            ...mapState('auth', ['auth'])
        },
        methods: {
            ...mapActions('auth', ['getAuthStatus', 'setUserInfo'])
        }
    }
</script>

<style scoped>

</style>