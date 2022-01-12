<template>
  <div class="page">
    <van-sticky>
      <van-nav-bar title="Token100" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="content" v-if="walletobj">
      <div class="content-top">
        <div class="line-1">
          <div class="item-left">
            <div class="info-box">
              <van-image class="info-logo" :src="walletobj.walletLogo" />
              <div class="info">
                <div class="info-txt">{{ walletobj.walletName }}</div>
                <div class="info-img">
                  <van-image
                    class="p"
                    v-if="walletobj.walletTypes.indexOf('app') >= 0"
                    :src="require('../../assets/image/手机@2x.png')"
                  />
                  <van-image
                    class="c"
                    v-if="walletobj.walletTypes.indexOf('hardware') >= 0"
                    :src="require('../../assets/image/芯片@2x.png')"
                  />
                  <van-image
                    class="p"
                    v-if="walletobj.walletTypes.indexOf('pc') >= 0"
                    :src="require('../../assets/image/pc.png')"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="item-right">
            <div class="right-txt">{{ $t('market.security') }}:{{ walletSecurity(walletobj.walletSecurity) }}</div>
            <van-rate
              v-model="walletobj.walletStar"
              :size="12"
              gutter="3px"
              color="#FAD97E"
              void-icon="star"
              void-color="#eee"
            />
          </div>
        </div>
        <div class="line-2">
          <div class="line-item">
            <div class="item-top">{{ $t('wallet.verificationmode') }}</div>
            <div class="item-bottom">{{ walletCheckType(walletobj.walletCheckType) }}</div>
          </div>
          <div class="line-item">
            <div class="item-top">{{ $t('wallet.degreeofanonymity') }}</div>
            <div class="item-bottom">{{ walletAnonymous(walletobj.walletAnonymous) }}</div>
          </div>
          <div class="line-item">
            <div class="item-top">{{ $t('wallet.easeofuse') }}</div>
            <div class="item-bottom">{{ walletEasy2use(walletobj.walletEasy2use) }}</div>
          </div>
          <div class="line-item">
            <div class="item-top">{{ $t('wallet.Otherservices') }}</div>
            <div class="item-bottom">
              <div class="bottom-txt">{{ walletOtherService(walletobj.walletOtherService) }}</div>
              <div class="bottom-img">
                <van-image
                  v-if="walletobj.walletOtherService.indexOf('2')>0"
                  class="img-1"
                  :src="require('../../assets/icon/邮件详情-来往邮件@2x.png')"
                ></van-image>
                <van-image
                  v-if="walletobj.walletOtherService.indexOf('3')>0"
                  class="img-2"
                  :src="require('../../assets/icon/购物车满@2x.png')"
                ></van-image>
              </div>
            </div>
          </div>
        </div>
        <div
          class="line-3"

        >
          <div
class="line-3-left"
:class="
            walletobj.walletFactorAuth === 1 ||
            walletobj.walletOpenSource === 1 ||
            walletobj.walletMultiSignature === 1 ||
            walletobj.walletFactorAuth === 1
              ? 'safety1'
              : 'danger1'
          ">
            <van-image
              v-if="
                walletobj.walletFactorAuth === 1 ||
                walletobj.walletOpenSource === 1 ||
                walletobj.walletMultiSignature === 1 ||
                walletobj.walletFactorAuth === 1
              "
              :src="require('../../assets/icon/安全@2x.png')"
            ></van-image>
            <van-image v-else :src="require('../../assets/icon/danger.png')"></van-image>
          </div>
          <div
class="line-3-right"
:class="
            walletobj.walletFactorAuth === 1 ||
            walletobj.walletOpenSource === 1 ||
            walletobj.walletMultiSignature === 1 ||
            walletobj.walletFactorAuth === 1
              ? 'safety2'
              : 'danger2'
          ">
            <div>
              <div class="txt">
                <span>{{ $t('wallet.Multipleauthentication') }}</span>
                <van-image
                  v-if="walletobj.walletMultiConfirm === 1"
                  width="13px"
                  height="9px"
                  :src="require('../../assets/icon/路径@2x.png')"
                ></van-image>
                <van-image
                  v-else
                  width="10px"
                  height="10px"
                  :src="require('../../assets/icon/关闭@2x.png')"
                ></van-image>
              </div>
              <div>
                <span>{{ $t('wallet.Multiplesignature') }}</span>
                <van-image
                  v-if="walletobj.walletMultiSignature === 1"
                  width="13px"
                  height="9px"
                  :src="require('../../assets/icon/路径@2x.png')"
                ></van-image>
                <van-image
                  v-else
                  width="10px"
                  height="10px"
                  :src="require('../../assets/icon/关闭@2x.png')"
                ></van-image>
              </div>
            </div>
            <div class="text-right">
              <div class="txt">
                <span>{{ $t('wallet.Whetheropensource') }}</span>
                <van-image
                  v-if="walletobj.walletOpenSource === 1"
                  width="13px"
                  height="9px"
                  :src="require('../../assets/icon/路径@2x.png')"
                ></van-image>
                <van-image
                  v-else-if="walletobj.walletOpenSource===0"
                  width="10px"
                  height="10px"
                  :src="require('../../assets/icon/关闭@2x.png')"
                ></van-image>
              </div>
              <div>
                <span>{{ $t('wallet.certification2FA') }}</span>
                <van-image
                  v-if="walletobj.walletFactorAuth === 1"
                  width="10px"
                  height="10px"
                  :src="require('../../assets/icon/关闭@2x.png')"
                ></van-image>
                <van-image
                  v-else
                  width="10px"
                  height="10px"
                  :src="require('../../assets/icon/关闭@2x.png')"
                ></van-image>
              </div>
            </div>
          </div>
        </div>
        <div class="line-4">
          <h3>{{ $t('wallet.supportcurrency') }}</h3>
          <div :class="!isShow ? 'clim-2' : ''">
            <van-tag
              v-for="(item, index) in walletobj.walletChains.split(',')"
              :key="index"
              @click="tocoin(index)"
              color="#F9F9F8"
              text-color="#9B9B9B"
              size="large"
              >{{ item }}</van-tag
            >
          </div>
          <div class="toogle" @click="toogle">
            <span>{{ isShow ? $t('plantform.putaway') : $t('plantform.unfold') }}</span>
            <van-icon :name="isShow ? 'arrow-up' : 'arrow-down'" />
          </div>
        </div>
        <div class="line-5"></div>
        <div class="line-6">
          <h3>{{ $t('wallet.basicinformation') }}</h3>
          <p>{{ walletobj.walletIntro }}</p>
        </div>
        <div class="line-7"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { walletDetail } from '@/api/wallet'
export default {
  data() {
    return {
      star: 2,
      isShow: false,
      id: null,
      walletobj: null
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.walletDetail()
  },
  methods: {
    // 点击币种
    tocoin(index) {
      const id = this.walletobj.walletChainIds.split(',')[index]
      this.$router.push({
        path: '/marketDetail',
        query: {
          id
        }
      })
    },
    // 其他服务
    walletOtherService(val) {
      switch (val) {
        case 0:
          return this.$t('wallet.unknown')
        case 1:
          return this.$t('information.rests')
        case 2:
          return this.$t('wallet.transition')
        case 3:
          return this.$t('wallet.shop')
        case '':
          return ''
      }
    },
    // 验证方式
    walletCheckType(val) {
      switch (val) {
        case 0:
          return this.$t('wallet.unknown')
        case 1:
          return 'SPV'
      }
    },
    // 易用性
    walletEasy2use(val) {
      switch (val) {
        case 1:
          return this.$t('wallet.harder')
        case 2:
          return this.$t('wallet.hard')
        case 3:
          return this.$t('market.medium')
        case 4:
          return this.$t('wallet.easily')
        case 5:
          return this.$t('wallet.easy')
      }
    },
    // 匿名程度
    walletAnonymous(val) {
      switch (val) {
        case 0:
          return this.$t('wallet.unknown')
        case 1:
          return this.$t('market.low')
        case 2:
          return this.$t('market.lower')
        case 3:
          return this.$t('market.high')
      }
    },
    // 安全性
    walletSecurity(value) {
      switch (value) {
        case 0:
          return this.$t('wallet.unknown')
        case 1:
          return this.$t('market.low')
        case 2:
          return this.$t('market.lower')
        case 3:
          return this.$t('market.medium')
        case 4:
          return this.$t('market.higher')
        case 5:
          return this.$t('market.high')
      }
    },
    // 获取钱包详情
    walletDetail() {
      const data = {
        walletId: this.id
      }
      walletDetail(data).then(res => {
        this.walletobj = res
        console.log(res, 'res```````````````````')
      })
    },
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
  background: #fff;
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
          display: flex;
          justify-content: center;
          align-items: center;
          .van-image {
            width: 44px;
            height: 53px;
          }
        }
        .safety1 {
          background: #f1f7ea;
        }
        .danger1 {
          background: #ffe0e0;
        }
        .safety2 {
          background: #fafff6;
        }
        .danger2 {
          background: #fff0f0;
        }
        .line-3-right {
          padding-left: 36px;

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
        .clim-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        margin: 30px 24px;
        h3 {
          font-size: 30px;
          color: #333;
        }
        .van-tag {
          margin-right: 22px;
          margin-top:12px;
          font-weight: 600;
          padding:9px 29px;
        }
        .toogle {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          color: #979797;
          margin: 24px 0;
        }
      }
      .line-5 {
        background: #f3f3f3;
        height: 42px;
      }
      .line-6 {
        margin: 25px 24px;
        h3 {
          color: #333;
          font-size: 32px;
        }
        p {
          font-size: 28px;
          color: #4a4a4a;
          line-height: 46px;
        }
      }
      .line-7 {
        background: #f3f3f3;
        height: 69px;
      }
    }
  }
}
</style>
