<template>
  <q-page class="flex flex-center">
    <div>{{ username }}</div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'User',
  computed: {
    ...mapGetters('auth', ['username'])
  },
  meta () {
    return {
      title: this.$t('page_titles.user_title')
    }
  }
}
</script>

<style scoped>

</style>
