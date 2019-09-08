<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-indigo-6 glossy">
      <q-toolbar>
        <q-btn flat round icon="home" :to="{name: 'public.index'}"></q-btn>
        <q-toolbar-title>
          Laravel 6.0 with Quasar v{{$q.version}} (SPA) by Manfred047
        </q-toolbar-title>
        <lang-manager></lang-manager>
        <template v-if="isAuth">
          <q-btn flat color="primary" label="User"></q-btn>
        </template>
        <template v-else>
          <q-btn flat :to="{name: 'public.login'}" label="Login"></q-btn>
          <q-btn flat :to="{name: 'public.register'}" label="Register"></q-btn>
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
import FooterLayout from '../global/FooterLayout'
import LangManager from '../../components/LangManager'
import { mapGetters } from 'vuex'
export default {
  name: 'PublicLayout',
  components: {
    LangManager,
    FooterLayout
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  }
}
</script>

<style>
</style>
