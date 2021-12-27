<!-- home -->
<template>
  <div class="about-container">
    <banner></banner>
    <van-sticky class="index-big">
      <search></search>
      <div class="tab-box">
        <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" sticky @click="clickTab">
          <van-tab v-for="(item, index) in tabsList" :key="index" :title="item.classifyName"> </van-tab>
        </van-tabs>
      </div>
      <div class="tab-head">
        <div class="head-left">
          <div class="t-1">#</div>
          <div class="t-2">{{$t('market.currency')}}</div>
        </div>
        <div class="head-right">
          <div class="t-3" @click="sortqianbao('walletSecurity')">
            <div>{{$t('market.security')}}</div>
            <div class="img-box">
              <img v-if="sortqianbaoFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
              <img v-else-if="sortqianbaoFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
              <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
          <div class="t-4" @click="sortqianbao('walletStar')">
            <div>{{$t('market.starlevel')}}</div>
            <div class="img-box">
              <img v-if="sortqianbaoFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
              <img v-else-if="sortqianbaoFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
              <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </van-sticky>
    <div class="wallet-box">
      <van-list>
        <van-cell v-for="(item, index) in qianbaoList" :key="index" @click="toWalletDetail(item.walletId)">
          <div class="item-left">
           <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
            <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index + 1 }}</van-tag>
            <div class="info-box">
              <van-image class="info-logo" :src="item.walletLogo" />
              <div class="info">
                <div class="info-txt">{{ item.walletName }}</div>
                <div class="info-img">
                  <van-image
                    class="p"
                    v-if="item.walletTypes.indexOf('app') >= 0"
                    :src="require('../../assets/image/手机@2x.png')"
                  />
                  <van-image
                    class="c"
                    v-if="item.walletTypes.indexOf('hardware') >= 0"
                    :src="require('../../assets/image/芯片@2x.png')"
                  />
                  <van-image
                    class="p"
                    v-if="item.walletTypes.indexOf('pc') >= 0"
                    :src="require('../../assets/image/pc.png')"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="item-right">
            <van-rate
              v-model="item.walletStar"
              :size="18"
              gutter="3px"
              color="#FAD97E"
              void-icon="star"
              void-color="#eee"
            />
            <div class="right-txt">{{$t('market.security')}}:{{ walletSecurity(item.walletSecurity) }}</div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import banner from '@/components/banner'
import { walletClassify, walletList } from '@/api/wallet'
import search from '@/components/search'
// 请求接口
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      tabsList: [],
      sortqianbaoFlag1: 0,
      sortqianbaoFlag2: 0,
      qianbaoList: [],
      classifyCode: null
    }
  },

  components: { banner, search },
  computed: {
    ...mapGetters(['userName'])
  },
  async mounted() {
    this.classifyCode = await this.walletClassify()
    this.walletList()
  },
  methods: {
    walletSecurity(value) {
      switch (value) {
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
    // 钱包详情
    toWalletDetail(id) {
      this.$router.push({
        path: '/walletDetail',
        query: {
          id
        }

      })
    },
    // 获取钱包列表
    walletList() {
      const data = {
        classifyCode: this.classifyCode
      }
      walletList(data).then(res => {
        this.qianbaoList = res
      })
    },
    // 钱包排序
    sortqianbao(key) {
      if (key === 'walletSecurity') {
        this.sortqianbaoFlag1++
        if (this.sortqianbaoFlag1 === 1) {
          this.qianbaoList.sort((a, b) => {
            return a['walletSecurity'] - b['walletSecurity']
          })
        } else if (this.sortqianbaoFlag1 === 2) {
          this.qianbaoList.sort((a, b) => {
            return b['walletSecurity'] - a['walletSecurity']
          })
        } else {
          this.qianbaoList.sort((a, b) => {
            return a - b
          })
          this.sortqianbaoFlag1 = 0
        }
      } else {
        this.sortqianbaoFlag2++
        if (this.sortqianbaoFlag2 === 1) {
          this.qianbaoList.sort((a, b) => {
            return a['walletStar'] - b['walletStar']
          })
        } else if (this.sortqianbaoFlag2 === 2) {
          this.qianbaoList.sort((a, b) => {
            return b['walletStar'] - a['walletStar']
          })
        } else {
          this.qianbaoList.sort((a, b) => {
            return a - b
          })
          this.sortqianbaoFlag2 = 0
        }
      }
    },
    // tabs点击
    clickTab(item) {
      this.classifyCode = this.tabsList[item].classifyCode
      this.walletList()
    },
    // 获取钱包分类
    walletClassify() {
      return new Promise((resolve, reject) => {
        walletClassify().then(res => {
          this.tabsList = res
          resolve(res[0].classifyCode)
        })
      })
    },
    // 钱包详情
    toDetail() {
      this.$router.push({
        name: 'walletDetail'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.about-container {
  background: #fff;
  box-sizing: border-box;
  .index-big {
    z-index: 10000;
    background: #fff;
  }
  .tab-head {
    background: #fff;
    z-index: 10000;
    border-top: 1px solid #d8d8d8;
    font-size: 22px;
    color: #999;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 33px 19px 0 28px;
    justify-content: space-between;
    .head-left,
    .head-right {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .t-1 {
      margin-right: 52px;
    }
    .t-3 {
      margin-right: 80px;
    }
    .t-3,
    .t-4 {
      text-align: right;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      .img-box {
        margin-left: 20px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
          width: 24px;
          height: 28px;
        }
      }
    }
  }
  .wallet-box {
    padding: 0 19px 0 28px;

    .van-cell {
      padding: 24px 0;
      border-bottom: 1px solid #eee;
      .van-cell__value {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
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
              width: 83px;
              height: 83px;
            }
            .info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 19px;
              .info-txt {
                font-size: 28px;
                color: #333;
                font-weight: 500;
                text-align: left;
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
            margin-top: 20px;
            font-size: 28px;
            color: #92959c;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
