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
    this.$store.dispatch('getRateArr')
  },
  computed: {
    ...mapGetters(['isLogin', 'languageId', 'globalRate', 'globalRateArr'])
  },
  methods: {
    setGlobalRate() {
      if (this.languageId === 'CNY') {
        const obj = this.globalRateArr.filter(item => {
          return item.rateC === 'CNY'
        })
        this.$store.dispatch('setRate', obj[0].rateR)
      } else {
        const obj = this.globalRateArr.filter(item => {
          return item.rateC === 'USD'
        })
        this.$store.dispatch('setRate', obj[0].rateR)
      }
    }
  }
}
</script>
<style lang="scss"></style>
