<template>
  <div class="banner-box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import img from '../assets/image/banner.png'
export default {
  name: 'Search',
  data() {
    return {
      img: img,
      images: [img, img, img, img, img]
    }
  }
}
</script>
<style lang="scss" scoped>
.banner-box {
  height: 190px;
  .my-swipe {
    height: 100%;
    .van-swipe-item {
      img {
        height: 100%;
      }
    }
  }
}
</style>
