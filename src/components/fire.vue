<template>
  <div class="fire-box">
    <div v-if="num===3">
      <van-image width="12px" height="13px" :src="require('../assets/image/火 (1).png')"></van-image>
      <van-image width="12px" height="13px" :src="require('../assets/image/火 (1).png')"></van-image>
      <van-image width="12px" height="13px" :src="require('../assets/image/火 (1).png')"></van-image>
    </div>
    <div v-else-if="num===2">
      <van-image width="12px" height="13px" :src="require('../assets/image/火 (1).png')"></van-image>
      <van-image width="12px" height="13px" :src="require('../assets/image/火 (1).png')"></van-image>
      <van-image width="12px" height="13px" :src="require('../assets/image/火.png')"></van-image>
    </div>
    <div  v-else-if="num===1">
      <van-image width="12px" height="13px" :src="require('../assets/image/火 (1).png')"></van-image>
      <van-image width="12px" height="13px" :src="require('../assets/image/火.png')"></van-image>
      <van-image width="12px" height="13px" :src="require('../assets/image/火.png')"></van-image>
    </div>
    <div v-else>
      <van-image width="12px" height="13px" :src="require('../assets/image/火.png')"></van-image>
      <van-image width="12px" height="13px" :src="require('../assets/image/火.png')"></van-image>
      <van-image width="12px" height="13px" :src="require('../assets/image/火.png')"></van-image>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.fire-box{
    &>div{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        .van-image{
            margin-left:9px;
        }
    }
}

</style>
