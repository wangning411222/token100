<template>
  <van-sticky>
    <div class="tab-head">
      <div class="head-left">
        <div class="t-1">#</div>
        <div class="t-2">币种</div>
      </div>
      <div class="head-right">
        <div class="t-3" @click="safetyClick">
          <div>安全性</div>
          <div class="img-box">
            <van-image :src="require('../assets/icon/上下箭头@2x(1).png')"> </van-image>
            <van-image :src="require('../assets/icon/上下箭头@2x(1).png')"> </van-image>
          </div>
        </div>
        <div class="t-4" @click="startClick">
          <div>星级</div>
          <div class="img-box">
            <van-image :src="require('../assets/icon/上下箭头@2x(1).png')"> </van-image>
            <van-image :src="require('../assets/icon/上下箭头@2x(1).png')"> </van-image>
          </div>
        </div>
      </div>
    </div>
  </van-sticky>
</template>
<script>
export default {
  data() {
    return {
      safety: true,
      start: true
    }
  },
  methods: {
    //   安全性排序
    safetyClick() {
      this.safety = !this.safety
      this.$emit('safety', this.safety)
    },
    //   星级排序
    startClick() {
      this.start = !this.start
      this.$emit('start', this.start)
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-head {
  font-size: 22px;
  color: #999;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 13px;
  margin-top: 33px;
  justify-content: space-between;
  .head-left,
  .head-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .t-1 {
    margin-right: 52px;
  }
  .t-3 {
    margin-right: 80px;
  }
  .t-3,
  .t-4 {
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .img-box {
      margin-left: 20px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      .van-image {
        width: 12px;
        height: 6px;
      }
      & > .van-image:first-child {
        margin-bottom: 3px;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
