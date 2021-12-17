<template>
    <div>
           <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31">
            <van-tab title="关注 "> </van-tab>
            <van-tab title="市值排名"> </van-tab>
            <van-tab title="期货合约"> </van-tab>
            <van-tab title="热搜榜"> </van-tab>
            <van-tab title="历史高位"> </van-tab>
            <van-tab title="涨幅榜"> </van-tab>
            <van-tab title="跌幅榜"> </van-tab>
            <van-tab title="换手率榜"> </van-tab>
            <van-tab title="成交额榜"> </van-tab>
            <van-tab title="新币上市"> </van-tab>
            <van-tab title="概念行情"> </van-tab>
          </van-tabs>
    </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>
