<template>
  <div class="search-page">
    <div class="search-head">
      <div class="head-left">
        <van-icon name="arrow-left" color="#666" @click="back" />
      </div>
      <van-search v-model="value" show-action clearable placeholder="搜索币种/钱包/平台">
        <template #action>
          <div @click="onSearch" class="search-text">搜索</div>
        </template></van-search
      >
    </div>
    <div class="search-content">
        <h3>热门搜索</h3>
        <div>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B"  size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    // 搜索
    onSearch() {
      console.log('search')
    },
    // 返回
    back() {
      this.$router.back(-1)
    }

  }
}
</script>
<style lang="scss" scoped>
.search-head {
  padding: 21px 26px 13px 31px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 11px solid #eee;
  .van-search {
    padding-left: 47px;
    flex-grow: 1;
  }
  .search-text {
    color: #e4bc31;
  }
}
.search-content{
    margin:30px 24px;
    h3{
        font-size:30px;
        color:#333;
    }
    .van-tag {
        margin-right:22px;
    }
}
</style>
