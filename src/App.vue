<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { Loading } from 'quasar'
export default {
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    Loading.show()
    console.log(store, currentRoute, previousRoute, redirect)
    Loading.hide()
  },
  name: 'App'
}
</script>

<style>
</style>
