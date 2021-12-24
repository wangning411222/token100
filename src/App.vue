<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  async created() {
    // localStorage.setItem('token', '11111111111111111')
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('setIsLogin', true)
    }
    const arr = await this.$store.dispatch('getRateArr')
    this.setGlobalRate(arr)
  },
  computed: {
    ...mapGetters(['isLogin', 'languageId', 'globalRate', 'globalRateArr'])
  },
  watch: {
    globalRateArr: {
      handler(val) {
        val.length && this.setGlobalRate(val)
      },
      deep: true
    }
  },
  methods: {
    setGlobalRate(arr) {
      if (this.languageId === 'CNY') {
        const obj = arr.filter(item => {
          return item.rateC === 'CNY'
        })
        this.$store.dispatch('setRate', obj[0].rateR)
      } else {
        const obj = arr.filter(item => {
          return item.rateC === 'USD'
        })
        this.$store.dispatch('setRate', obj[0].rateR)
      }
    }
  }
}
</script>
<style lang="scss"></style>
