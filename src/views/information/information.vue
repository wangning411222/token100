<!-- home -->
<template>
  <div class="about-container">
    <banner></banner>
    <search></search>
  </div>
</template>

<script>
import banner from '@/components/banner'
import search from '@/components/search'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      wechat: `${this.$cdn}/wx/640.gif`
    }
  },
  components: { banner, search },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss">
.about-container {
  /* 你的命名空间 */
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
}
</style>
