<template>
  <q-layout>
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-toolbar-title>
          Laravel 5.8 with Quasar v{{$q.version}} (SPA) by Manfred047
        </q-toolbar-title>
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
export default {
  name: 'PublicLayout',
  components: {
    FooterLayout
  }
}
</script>

<style>
</style>
