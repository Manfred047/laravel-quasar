<template>
    <q-layout view="lHh Lpr fff">
        <q-layout-header>
            <router-view name="top-menu"></router-view>
        </q-layout-header>
        <q-page-container>
            <router-view></router-view>
        </q-page-container>
        <router-view name="app-footer"></router-view>
    </q-layout>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        name: "app",
        watch: {
            auth(value) {
                if (value) {
                    this.getUserInfo();
                }
            }
        },
        computed: {
            ...mapState('auth', ['auth'])
        },
        methods: {
            ...mapActions('auth', ['getUserInfo'])
        }
    }
</script>

<style scoped>

</style>