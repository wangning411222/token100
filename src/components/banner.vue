<template>
  <div class="banner-box">
    <van-swipe :autoplay="3000" :lazy-render='true' ref="swipe">
      <van-swipe-item v-for="(item, index) in images" :key="index" @click="link(item.bannerUrl)">
        <van-image :src="item.bannerLogo" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { bannerList } from '@/api/common'
export default {
  name: 'Search',
  data() {
    return {
      images: []

    }
  },
  methods: {
    // 请求接口
    bannerList() {
      bannerList().then(res => {
        this.images = res
        this.$refs.swipe.resize()
      })
    },
    // 点击图片跳转
    link(url) {
      window.open(url)
    }

  },
  created() {
    this.bannerList()
  }
}
</script>
<style lang="scss" scoped>
.banner-box {
  height: 190px;
  .van-swipe {
    height: 100%;

    .van-swipe-item {
      .van-image {
        height: 100%;
         width:100%;
      }
    }
  }
}
</style>
