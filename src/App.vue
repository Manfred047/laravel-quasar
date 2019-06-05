<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.getTest()
  },
  methods: {
    getTest () {
      this.$axios.get(process.env.API_URL)
        .then(response => {
          console.log(response.data)
        })
    }
  }
}
</script>

<style>
</style>
