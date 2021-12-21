<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { rateList } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  mounted() {
    // localStorage.setItem('token', '11111111111111111')
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('setIsLogin', true)
    }
    this.rateList()
  },
  computed: {
    ...mapGetters(['isLogin', 'languageId', 'globalRate'])
  },
  methods: {
    rateList() {
      rateList().then(res => {
        const obj = res.filter(item => {
          return item.rateC === 'CNY'
        })
        if (this.languageId === 'zh-CN') {
          this.$store.dispatch('setRate', obj[0].rateR)
        } else {
          this.$store.dispatch('setRate', 1)
        }
      })
    }
  }
}
</script>
<style lang="scss"></style>
