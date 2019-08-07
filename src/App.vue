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
    let locale = store.getters['lang/getLanguage']
    store.dispatch('lang/setLanguage', [store.$router.app.$i18n, locale])
    Loading.hide()
  },
  name: 'App'
}
</script>

<style>
</style>
