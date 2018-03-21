<template>
    <div>
        <q-toolbar color="blue-grey-14">
            <q-toolbar-title>
                <span>Laravel with Quasar Framework (SPA) by Manfred047</span>
            </q-toolbar-title>
            <q-btn flat dense label="Go to welcome" @click="redirect"></q-btn>
        </q-toolbar>
    </div>
</template>

<script>
    export default {
        name: "error-toolbar",
        methods: {
            redirect() {
                this.$router.replace({
                    name: 'welcome'
                });
            }
        }
    }
</script>

<style scoped>

</style>