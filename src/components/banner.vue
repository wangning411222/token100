<template>
  <div class="banner-box">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <van-image :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      images: [require('@/assets/image/banner.png'), require('@/assets/image/banner.png'), require('@/assets/image/banner.png'), require('@/assets/image/banner.png'), require('@/assets/image/banner.png')]

    }
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
