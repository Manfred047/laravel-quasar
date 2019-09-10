<template>
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
import { Loading } from 'quasar'
import _ from 'lodash'
export default {
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    Loading.show()
    let locale = store.getters['lang/getLanguage']
    store.dispatch('lang/setLanguage', [store.$router.app.$i18n, locale])
    // For Auth
    let reqAuth = _.get(currentRoute, ['meta', 'requiresAuth'], false)
    if (reqAuth) {
      return store.dispatch('auth/getUserData')
        .then(response => {
          if (!store.getters['auth/isAuth']) {
            return redirect(`/login?redirect=${currentRoute.fullPath}`)
          }
        })
        .catch(errors => {
          return redirect(`/login?redirect=${currentRoute.fullPath}`)
        })
        .then(() => {
          Loading.hide()
        })
    }
    Loading.hide()
  },
  name: 'App'
}
</script>

<style>
</style>
