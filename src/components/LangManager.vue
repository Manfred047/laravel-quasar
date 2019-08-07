<template>
  <div class="q-pa-md">
    <q-select v-model="language" :options="languages"></q-select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  name: 'LangManager',
  beforeMount () {
    this.language = _.find(this.languages, x => x.value === this.getLanguage)
  },
  watch: {
    language (item) {
      this.setLanguage([this.$i18n, item.value])
    }
  },
  computed: {
    ...mapGetters('lang', ['languages', 'getLanguage'])
  },
  methods: {
    ...mapActions('lang', ['setLanguage'])
  },
  data () {
    return {
      language: null
    }
  }
}
</script>

<style scoped>

</style>
