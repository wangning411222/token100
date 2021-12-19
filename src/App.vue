<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  mounted() {
    // localStorage.setItem('token', '11111111111111111')
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('setIsLogin', true)
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>
<style lang="scss"></style>
