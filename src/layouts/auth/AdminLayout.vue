<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="drawer = !drawer"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Laravel 7.0 with Quasar v{{$q.version}} (SPA) by Manfred047
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      bordered
      content-class="bg-grey-2">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <q-item-label header>Essential Links</q-item-label>
          <q-item exact tag="a" clickable :to="{name: 'public.index'}">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('page_titles.home_title') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item :to="{name: 'auth.user'}">
            <q-item-section avatar>
              <q-icon name="account_box" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('page_titles.user_title') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item :to="{name: 'auth.info'}">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('page_titles.info_title') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/go-error">
            <q-item-section avatar>
              <q-icon name="error" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('page_titles.e404_title') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable @click="logout($router)">
            <q-item-section avatar>
              <q-icon name="lock" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('page_titles.logout_title') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent text-center">
          <q-avatar size="70px" class="q-mb-sm">
            <img src="~assets/smile.jpg">
          </q-avatar>
          <div class="text-weight-bold">{{ username }}</div>
          <div>{{ email }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <footer-layout></footer-layout>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Loading } from 'quasar'
export default {
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    Loading.show()
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
  },
  name: 'AdminLayout',
  components: {
    'footer-layout': () => import('../global/FooterLayout')
  },
  computed: {
    ...mapGetters('auth', ['username', 'email'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<style scoped>

</style>
