<template>
  <div class="q-pa-md">
    <q-select
      v-model="language"
      :options="languages"
      emit-value
      map-options>
    </q-select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  name: 'LangManager',
  beforeMount () {
    this.findLang()
  },
  watch: {
    language (item) {
      this.setLanguage([this.$i18n, item])
    }
  },
  computed: {
    ...mapGetters('lang', ['languages', 'getLanguage'])
  },
  methods: {
    ...mapActions('lang', ['setLanguage']),
    findLang () {
      const language = _.find(this.languages, x => x.value === this.getLanguage)
      this.language = _.get(language, ['value'], 'en')
    }
  },
  data () {
    return {
      language: 'en'
    }
  }
}
</script>

<style scoped>

</style>
