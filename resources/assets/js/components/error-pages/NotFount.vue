<template>
    <q-page class="bg-dark ">
        <div class="row col-12 vertical-middle justify-center"
             style="top: 50%;position: absolute;transform: translate(0,-50%);">
            <div class="row col-md-6 justify-center">
                <img :src="$master.url('/img/e404.png')" style="width: 100%;height: auto;">
            </div>
        </div>
    </q-page>
</template>

<script>
    export default {
        name: "not-fount"
    }
</script>

<style scoped>

</style>