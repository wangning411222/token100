<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
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
          active: require('../../assets/icon/hangqing-tabbar-active.png'),
          inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png'
        },
        {
          title: '平台',
          to: {
            name: 'Platform'
          },
          active: 'https://img01.yzcdn.cn/vant/user-active.png',
          inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png'
        },
        {
          title: '资讯',
          to: {
            name: 'Information'
          },
          active: 'https://img01.yzcdn.cn/vant/user-active.png',
          inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png'
        },
        {
          title: '钱包',
          to: {
            name: 'Wallet'
          },
          active: 'https://img01.yzcdn.cn/vant/user-active.png',
          inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png'
        },
        {
          title: '我的',
          to: {
            name: 'Mine'
          },
          active: require('../../assets/icon/wode-tabbar-active.png'),
          inactive: require('../../assets/icon/wode-tabbar-inactive.png')
        }
      ]
    }
  },
  components: {
    TabBar
  },
  methods: {
    handleChange(v) {
      console.log('tab value:', v)
    }
  }
}
</script>
