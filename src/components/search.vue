<template>
  <div class="search-box">
    <div class="search-img"></div>
    <div class="search-shape" @click="linkToSearch">
      <van-image :src="require('../assets/image/形状@2x.png')"></van-image>
      <div>搜索币种/钱包/平台</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Search',
  methods: {
    linkToSearch() {
      this.$router.push({
        name: 'search'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.search-box {
  margin: 26px 23px 44px 19px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .search-img {
    width: 220px;
    height: 80px;
    background-image: url('../assets/image/logo@2x.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .search-shape {
    line-height: 80px;
    height: 80px;
    padding-left: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    position: relative;
    margin-left: 35px;
    background: #f9f9f8;
    border-radius: 8px;
    .van-image {
      margin-right: 13px;
      width: 27px;
      height: 27px;
    }
    div {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #9ca1a7;
      line-height: 40px;
    }
  }
}
</style>
