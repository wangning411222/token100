<template>
  <div class="news-item" @click="toRich">
    <div class="item-left">
      <div class="left-top">
        <h3 class="txt">{{ info }}</h3>
        <div class="info">
          <div>{{ author }}</div>
          <div>{{ time }}</div>
        </div>
      </div>
      <div class="left-bottom"></div>
    </div>
    <div class="item-rigth">
      <van-image width="100px" height="80px" :src="url"></van-image>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    author: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 详情
    toRich() {
      this.$router.push({
        name: 'richHtml'
      })
    }
  },
  mounted() {
    console.log(this.info, 'infoinfoinfoinfoinfoinfo')
  }
}
</script>
<style lang="scss" scoped>
.news-item {
  padding: 35px 24px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #eeeeee;
  .item-left {
    display: flex;
    flex-direction: column;
    padding-right: 23px;
    .txt {
        margin:0;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 42px;
    }
    .info {
      margin-top: 15px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 37px;
      display: flex;
      flex-direction: row;

      & > div:first-child {
        margin-right: 19px;
      }
    }
  }
}
</style>
