<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-indigo-6 glossy">
      <q-toolbar>
        <q-btn flat round icon="home" :to="{name: 'public.index'}"></q-btn>
        <q-toolbar-title>
          Laravel 7.0 with Quasar v{{$q.version}} (SPA) by Manfred047
        </q-toolbar-title>
        <lang-manager></lang-manager>
        <template v-if="isAuth">
          <q-btn flat :label="$t('page_titles.user_title')" :to="{name: 'auth.user'}"></q-btn>
        </template>
        <template v-else>
          <q-btn flat :to="{name: 'public.login'}" :label="$t('login.title')"></q-btn>
          <q-btn flat :to="{name: 'public.register'}" :label="$t('register.title')"></q-btn>
        </template>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer-layout></footer-layout>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PublicLayout',
  components: {
    'lang-manager': () => import('../../components/LangManager'),
    'footer-layout': () => import('../global/FooterLayout')
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  }
}
</script>

<style>
</style>
