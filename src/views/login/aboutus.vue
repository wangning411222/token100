<template>
  <div class="page">
    <van-sticky>
      <van-nav-bar title="关于我们" left-arrow @click-left="onClickLeft"> </van-nav-bar>
    </van-sticky>
    <div class="page-content">
      <p>
        <span>TOKEN100</span>, 于2017年8月正式在创立，18年初 TOKEN100总部正式迁移至日本东京，
        TOKEN100是区块链行业起步最早的区块链数据资讯平台之-。我.们的使命是“打造中立,权威的区块链综合信息平台",
        TOKEN100秉承"一切以用户为本”的经营理念，为用户提供优质的区块链信息分享服务。
      </p>
      <p>
        TOKEN100拥有海量的数字货币数据，收录优质的数字货币交易平台并通过数据进行科学分级管理。我们秉承工匠精神，通过大数据技术对海量数据进行多维度，多层级处理，将最有价值的信息分享给用户。
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPsd: false
    }
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.push({
        name: 'Mine'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  background: #fff;
  .van-nav-bar {
    background: #fff;
    .van-icon {
      color: #666666;
    }
    .van-nav-bar__left {
      .van-icon-arrow-left {
        color: #666666;
      }
    }
  }
  min-height: 100vh;

  .page-content {
    margin: 42px 30px 0 30px;

    p {
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      font-size: 34px;
      color: #666;
      line-height: 50px;
      span {
        font-size: 40px;
      }
    }
    & > p:last-child {
      margin-top: 50px;
    }
  }
}
</style>
