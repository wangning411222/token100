<template>
  <div class="page">
    <van-sticky>
      <van-nav-bar title="关于我们" left-arrow @click-left="onClickLeft"> </van-nav-bar>
    </van-sticky>
    <div v-html="content">

    </div>
  </div>
</template>
<script>
import { getSetting } from '@/api/mine'
export default {
  data() {
    return {
      content: null
    }
  },
  created() {
    this.getSetting()
  },
  methods: {
    // 获取关于我们
    getSetting() {
      const data = {
        settingTitle: '关于我们'
      }
      getSetting(data).then(res => {
        this.content = res.settingContent
      })
    },
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
