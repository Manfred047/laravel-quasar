<template>
  <div class="q-pa-md">
    <q-btn-dropdown unelevated label="Lang">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Photos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Articles</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  name: 'LangManager'
}
</script>

<style scoped>

</style>
