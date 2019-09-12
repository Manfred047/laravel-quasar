<template>
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    let locale = store.getters['lang/getLanguage']
    store.dispatch('lang/setLanguage', [store.$router.app.$i18n, locale])
  },
  name: 'App'
}
</script>

<style>
</style>
