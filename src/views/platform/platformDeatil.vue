<template>
  <div class="page">
    <van-sticky>
      <van-nav-bar title="Token100" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="detail-head">
      <div class="head-top">
        <div class="top-left">
          <van-image
            width="51px"
            height="50px"
            :src="require('../../assets/image/Nem_logotype_overunder_lightbg_WEB@2x.png')"
          ></van-image>
        </div>
        <div class="top-right">
          <div class="right-line1">
            <div class="line1-left">
              <div>币安网</div>
              <van-tag type="success">ER9</van-tag>
            </div>
            <van-image width="16px" height="15px" :src="require('../../assets/image/星星2@2x.png')"></van-image>
          </div>
          <div class="right-line2">
            <div class="light">
              <van-image width="11px" height="10px" :src="require('../../assets/image/灯泡@2x.png')"></van-image>
              <div>NO.1</div>
            </div>
            <div>24H平台交易额</div>
            <div>¥ 1万亿</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
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
    /deep/ .van-nav-bar__left {
      .van-icon-arrow-left {
        color: #666666;
      }
    }
  }
  .detail-head {
    .head-top {
      padding: 36px 26px 28px 30px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .top-right {
        margin-left: 32px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
      .right-line1,
      .right-line2 {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .right-line1 {
        justify-content: space-between;
        .line1-left {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          & > div:first-child {
            font-size: 38px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #4a4a4a;
            line-height: 53px;
            margin-right: 18px;
          }
          .van-tag {
            padding: 2px 19px;
          }
        }
      }
      .right-line2 {
          margin-top:32px;
        justify-content: flex-start;
        .light {
          border-radius: 23px;
          border: 2px solid #4cb367;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 10px 8px;
          color: #4cb367;
        }
        & > div:nth-child(2) {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #92959c;
          margin-left: 30px;
        }
        & > div:last-child {
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-left:64px;
        }
      }
    }
  }
}
</style>

