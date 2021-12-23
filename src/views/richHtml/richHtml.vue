<template>
  <div>
    <van-sticky>
      <van-nav-bar title="Token100" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div v-html="contentHtml"></div>
  </div>
</template>
<script>
import { newsGet } from '@/api/information'
export default {
  data() {
    return {
      newsId: null,
      contentHtml: null
    }
  },
  methods: {
    //   获取新闻详情
    newsGet() {
      const data = {
        newsId: this.newsId
      }
      newsGet(data).then(res => {
        this.contentHtml = res.newsContent
      })
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    },
    // 搜索页面
    onClickRight() {
      this.$router.push({
        name: 'search'
      })
    }
  },
  mounted() {
    this.newsId = this.$route.query.id
    this.newsGet()
  }
}
</script>
<style lang="scss" scoped>
    .van-nav-bar {

    .van-icon {
      color: #666666;
    }
    /deep/ .van-nav-bar__left {
      .van-icon-arrow-left {
        color: #666666;
      }
    }
  }
</style>
