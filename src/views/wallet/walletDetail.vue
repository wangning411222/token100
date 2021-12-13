<template>
  <div class="page">
    <van-sticky>
      <van-nav-bar title="Token100" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content">
      <div class="content-top">
        <div class="line-1">
          <div class="item-left">
            <div class="info-box">
              <van-image class="info-logo" :src="require('../../assets/image/比特币@2x.png')" />
              <div class="info">
                <div class="info-txt">BTC</div>
                <div class="info-img">
                  <van-image class="p" :src="require('../../assets/image/手机@2x.png')" />
                  <van-image class="c" :src="require('../../assets/image/芯片@2x.png')" />
                </div>
              </div>
            </div>
          </div>
          <div class="item-right">
            <div class="right-txt">安全性:中等</div>
            <van-rate v-model="star" :size="12" gutter="3px" color="#FAD97E" void-icon="star" void-color="#eee" />
          </div>
        </div>
        <div class="line-2">
          <div class="line-item">
            <div class="item-top">验证方式</div>
            <div class="item-bottom">SPV</div>
          </div>
          <div class="line-item">
            <div class="item-top">匿名程度</div>
            <div class="item-bottom">中</div>
          </div>
          <div class="line-item">
            <div class="item-top">易用性</div>
            <div class="item-bottom">较易</div>
          </div>
          <div class="line-item">
            <div class="item-top">其他服务</div>
            <div class="item-bottom">
              <div class="bottom-txt">其他</div>
              <div class="bottom-img">
                <van-image class="img-1" :src="require('../../assets/icon/邮件详情-来往邮件@2x.png')"></van-image>
                <van-image class="img-2" :src="require('../../assets/icon/购物车满@2x.png')"></van-image>
              </div>
            </div>
          </div>
        </div>
        <div class="line-3">
          <div class="line-3-left">
            <van-image :src="require('../../assets/icon/安全@2x.png')"></van-image>
          </div>
          <div class="line-3-right">
            <div>
              <div class="txt">
                <span>多重认证</span>
                <van-image width="13px" height="9px" :src="require('../../assets/icon/路径@2x.png')"></van-image>
              </div>
              <div>
                <span>多重签名</span>
                <van-image width="13px" height="9px" :src="require('../../assets/icon/路径@2x.png')"></van-image>
              </div>
            </div>
            <div class="text-right">
              <div class="txt">
                <span>是否开源</span>
                <van-image width="13px" height="9px" :src="require('../../assets/icon/路径@2x.png')"></van-image>
              </div>
              <div>
                <span>2FA认证</span>
                <van-image width="10px" height="10px" :src="require('../../assets/icon/关闭@2x.png')"></van-image>
              </div>
            </div>
          </div>
        </div>
        <div class="line-4">
          <h3>支持币种</h3>
          <div>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
          </div>
          <div v-show="isShow">
               <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
            <van-tag color="#F9F9F8" text-color="#9B9B9B" size="large">BTC</van-tag>
          </div>
          <div class="toogle" @click="toogle">
              <span>{{isShow?'收起':"展开"}}</span>
              <van-icon :name="isShow?'arrow-up':'arrow-down'" />
          </div>
        </div>
        <div class="line-5"></div>
        <div class="line-6">
            <h3>基本信息</h3>
            <p>imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，imToken是一款移动端轻钱包App，</p>
        </div>
        <div class="line-7"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      star: 2,
      isShow: false
    }
  },
  methods: {
    //   展开折叠
    toogle() {
      this.isShow = !this.isShow
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
  }
}
</script>
<style lang="scss" scoped>
.page {
    background:#fff;
  .van-nav-bar {
    background: #ecedee;
    /deep/.van-icon {
      color: #666666;
    }
    .van-nav-bar__left {
      .van-icon-arrow-left {
        color: #666666;
      }
    }
  }
  .content {
    .content-top {
      .line-1 {
        margin: 0 22px 0 18px;
        padding-top: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .item-left {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          .info-box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .info-logo {
              margin-left: 18px;
              width: 94px;
              height: 94px;
            }
            .info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 29px;
              .info-txt {
                font-size: 40px;
                color: #333;
                font-weight: 500;
                text-align: left;
                margin-bottom: 12px;
              }
              .info-img {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                .p {
                  margin-right: 5px;
                  width: 24px;
                  height: 33px;
                }
                .c {
                  width: 35px;
                  height: 35px;
                }
              }
            }
          }
        }
        .item-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .right-txt {
            margin-bottom: 22px;
            font-size: 24px;
            color: #333;
            text-align: right;
          }
        }
      }
      .line-2 {
        padding: 31px 0 31px 46px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .line-item {
          border-right: 1px solid #eeeeee;
          padding-right: 44px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .item-top {
            font-size: 24px;
            color: #9b9b9b;
            line-height: 34px;
          }
          .item-bottom {
            font-size: 30px;
            color: #333;
            line-height: 42px;
            margin-top: 6px;
          }
          & > .item-bottom:last-child {
            display: flex;
            flex-direction: row;
            .bottom-txt {
            }
            .bottom-img {
              margin-left: 13px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              .img-1 {
                width: 26px;
                height: 24px;
              }
              .img-2 {
                margin-left: 11px;
                width: 29px;
                height: 27px;
              }
            }
          }
        }
        & > .line-item:last-child {
          border-right: none;
        }
      }
      .line-3 {
        height: 100px;
        display: flex;
        flex-direction: row;
        .line-3-left {
          width: 123px;
          height: 100%;
          background: #f1f7ea;
          display: flex;
          justify-content: center;
          align-items: center;
          .van-image {
            width: 44px;
            height: 53px;
          }
        }
        .line-3-right {
          padding-left: 36px;
          background: #fafff6;
          flex-grow: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          .text-right {
            margin-left: 176px;
          }
          .txt {
            margin-bottom: 10px;
          }
          .van-image {
            margin-left: 20px;
          }
        }
      }
      .line-4 {

        margin: 30px 24px;
        h3 {
          font-size: 30px;
          color: #333;
        }
        .van-tag {
          margin-right: 22px;
        }
        .toogle{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color:#979797;
            margin:24px 0;
        }
      }
      .line-5{
          background:#F3F3F3;
          height:42px;
      }
      .line-6{
          margin:25px 24px;
          h3{
              color:#333;
              font-size:32px;
          }
          p{
              font-size:28px;
              color:#4A4A4A;
              line-height:46px;
          }
      }
       .line-7{
          background:#F3F3F3;
          height:69px;
      }
    }
  }
}
</style>
