<template>
    <q-page>
        <h1>Welcome user: {{ userInfo.username }}</h1>
    </q-page>
</template>

<script>
    import { mapGetters} from 'vuex'
    export default {
        name: "user",
        computed: {
            ...mapGetters('auth', ['userInfo']),
        },
    }
</script>

<style scoped>

</style>