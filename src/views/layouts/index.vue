<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer" v-if="isShow">
      <globalPreview v-if="!$route.meta.hidePreview"></globalPreview>
      <TabBar :data="tabbars"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TabBar from '@/components/TabBar'
import globalPreview from '@/components/globalPreview'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '行情',
          to: {
            name: 'Market'
          },
          active: require('../../assets/icon/数据@2x.png'),
          inactive: require('../../assets/icon/数据@2x1.png')
        },
        {
          title: '平台',
          to: {
            name: 'Platform'
          },
          active: require('../../assets/icon/模块1@2x.png'),
          inactive: require('../../assets/icon/模块@2x.png')
        },
        {
          title: '资讯',
          to: {
            name: 'Information'
          },
          active: require('../../assets/icon/规则1@2x.png'),
          inactive: require('../../assets/icon/规则@2x.png')
        }
        // {
        //   title: '钱包',
        //   to: {
        //     name: 'Wallet'
        //   },
        //   active: require('../../assets/icon/卡券1@2x.png'),
        //   inactive: require('../../assets/icon/卡券@2x.png')
        // },
        // {
        //   title: '我的',
        //   to: {
        //     name: 'Mine'
        //   },
        //   active: require('../../assets/icon/我的1@2x.png'),
        //   inactive: require('../../assets/icon/我的@2x.png')
        // }
      ]
    }
  },
  components: {
    TabBar,
    globalPreview
  },
  computed: {
    ...mapGetters(['userName', 'isShow'])
  },
  methods: {

  },
  created() {
    const newTime = new Date().getTime()
    const time2 = new Date('2022-01-15').getTime()
    if (newTime > time2) {
      this.$store.dispatch('setShow', false)
    } else {
      this.$store.dispatch('setShow', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-footer{
  z-index:2000;
  position: relative;
}

</style>
