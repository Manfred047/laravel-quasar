<template>
    <q-page class="relative-position">
        <img class="responsive" :src="$master.url('/img/e404.png')">
        <q-btn clas="fixed-bottom"
               icon="copyright"
               @click="nyami"
               label="Copyright Nyami">
        </q-btn>
    </q-page>
</template>

<script>
    export default {
        name: "not-fount",
        methods: {
            nyami() {
                window.open('https://www.facebook.com/BestNyamiLas/', '_blank');
            }
        }
    }
</script>

<style scoped>

</style>