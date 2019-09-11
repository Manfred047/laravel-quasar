<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/custom/e404.gif"
        style="width:30vw;max-width:200px;"
      >
    </p>
    <p class="text-faded"> {{ $t('page_titles.e404_title') }} </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.replace({name: 'public.index'})">
      {{ $t('general_form.back_btn') }}
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  meta () {
    return {
      title: this.$t('page_titles.e404_title')
    }
  }
}
</script>
