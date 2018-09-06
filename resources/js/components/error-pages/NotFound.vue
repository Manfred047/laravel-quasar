<template>
    <q-page class="image"></q-page>
</template>

<script>
    export default {
        name: "not-found"
    }
</script>

<style scoped>
    body, html {
        height: 100%;
        margin: 0;
    }

    .image {
        /* The image used */
        background-image: url("/img/e404-black.png");

        /* Full height */
        height: 100%;

        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
