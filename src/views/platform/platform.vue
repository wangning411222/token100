<template>
  <div class="about-container">
    <banner></banner>
    <van-sticky>
      <search></search>
      <div class="head">
        <div class="head-left">
          <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" @click="tabsClick">
            <van-tab :title="$t('plantform.ERGlobalExchangerankings') "> </van-tab>
            <van-tab :title="$t('plantform.Holdingsranking')"> </van-tab>
            <van-tab :title="$t('plantform.Contractplatform')"> </van-tab>
            <van-tab title="OTC"> </van-tab>
            <van-tab :title="$t('plantform.Activeplatform')"> </van-tab>
            <van-tab :title="$t('market.follow')"> </van-tab>
          </van-tabs>
        </div>
        <div class="head-right">
          <van-dropdown-menu>
            <van-dropdown-item :title="rate" v-model="rate" ref="item">
              <div class="rate-box">
                <van-row>
                  <van-col
                    class="rate-item"
                    v-for="(item, index) in globalRateArr"
                    :key="index"
                    span="8"
                    @click="selectRate(item)"
                    >{{ item.rateName }}&nbsp;{{ item.rateC }}</van-col
                  >
                </van-row>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
      </div>
      <!-- ER全球交易排行榜 -->
      <div class="table-head" v-if="active === 0">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">{{$t('plantform.bourse')}}</van-col>
          <van-col span="8">
            <div class="arrow-box" @click="sorterList">
              <div>{{$t('market.forehead24h')}}({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sorterFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sorterFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
      <!-- 持有资产 -->
      <div class="table-head" v-if="active === 1">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">{{$t('plantform.bourse')}}</van-col>
          <van-col span="8">
            <div class="arrow-box" @click="sortchiyouList">
              <div>{{$t('plantform.Assetsheld')}}({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortchiyouFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortchiyouFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
      <!-- 合约平台 -->
      <div class="table-head" v-if="active === 2">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="8">{{$t('plantform.ERranking')}}/{{$t('plantform.tradingplatform')}}</van-col>
          <van-col span="8" style="text-align: right"> {{$t('plantform.Contracttransactionquantity')}} </van-col>
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
      <!-- OTC -->
      <div class="table-head" v-if="active === 3">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="8">{{$t('plantform.ERranking')}}/{{$t('plantform.tradingplatform')}}</van-col>
          <van-col span="8">
            <div class="arrow-box" @click="sortotcList">
              <div>{{$t('market.forehead24h')}}({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortotcFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortotcFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
      <!-- 活跃平台 -->
      <div class="table-head" v-if="active === 4">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">{{$t('plantform.bourse')}}</van-col>
          <van-col span="8">
            <div class="arrow-box" @click="sorthuoyueList">
              <div>{{$t('market.forehead24h')}}({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sorthuoyueFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sorthuoyueFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
      <!-- 关注列表 -->
      <div class="table-head" v-if="active === 5 && isLogin">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">{{$t('plantform.bourse')}}</van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortguanzhu">
              <div>{{$t('market.forehead24h')}}({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="sortguanzhuFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortguanzhuFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="10" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
    </van-sticky>
    <div class="list-box">
      <!-- ER全球交易排行榜 -->
      <van-loading
        v-show="loading"
        style="width: 100%; height: 100%; position: absolute; top: 200px; text-align: center"
        color="rgb(228, 188, 49)"
      />
      <van-list v-if="active === 0">
        <van-row
          class="list-item"
          v-for="(item, index) in erLists"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
          @click="toDetail(item.marketId)"
        >
          <van-col span="2">
            <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
            <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
          </van-col>
          <van-col span="6" class="icon-name">
            <van-image width="18px" height="18px" :src="item.marketLogo"></van-image>
            <span>{{ item.marketName }}</span>
          </van-col>
          <van-col span="8" style="text-align: right"> {{ enNumUnti(item.marketDayVolume * rateR) }} </van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.marketRankEx"></myprogress>
            </div>
          </van-col>
        </van-row>
        <div class="list-more" v-if="erLists.length" @click="listMore(active)">{{$t('market.clickmore')}}</div>
      </van-list>
      <!-- 持有资产 -->
      <van-list v-if="active === 1">
        <van-row
          class="list-item"
          v-for="(item, index) in chiyouLists"
          :key="index"
          type="flex"
          @click="toDetail(item.marketId)"
          justify="space-between"
          cente="center"
        >
          <van-col span="2">
            <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
            <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
          </van-col>
          <van-col span="6" class="icon-name">
            <van-image width="18px" height="18px" :src="item.marketLogo"></van-image>
            <span>{{ item.marketName }}</span>
          </van-col>
          <van-col span="8" style="text-align: right"> {{ enNumUnti(Number(item.marketDayVolume) * rateR) }} </van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.marketRankEx"></myprogress>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 合约平台 -->
      <van-list v-if="active === 2">
        <van-row
          class="list-item"
          v-for="(item, index) in heyueLists"
          :key="index"
          type="flex"
          @click="toDetail(item.marketId)"
          justify="space-between"
          cente="center"
        >
          <van-col span="8" class="heyue-box">
            <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
            <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            <div class="icon-name margin-left">
              <van-image width="18px" height="18px" :src="item.marketLogo"></van-image>
              <span>{{ item.marketName }}</span>
            </div>
          </van-col>
          <van-col span="8" style="text-align: right">{{ enNumUnti(item.marketDayVolume) }} </van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.marketRankEx"></myprogress>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <!-- OCT -->
      <van-list v-if="active === 3">
        <van-row
          class="list-item"
          v-for="(item, index) in otcLists"
          :key="index"
          type="flex"
          @click="toDetail(item.marketId)"
          justify="space-between"
          cente="center"
        >
          <van-col span="8" class="heyue-box">
            <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
            <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
            <div class="icon-name margin-left">
              <van-image width="18px" height="18px" :src="item.marketLogo"></van-image>
              <span>{{ item.marketName }}</span>
            </div>
          </van-col>
          <van-col span="8" style="text-align: right"> {{ enNumUnti(Number(item.marketDayVolume) * rateR) }} </van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.marketRankEx"></myprogress>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 活跃平台 -->
      <van-list v-if="active === 4">
        <van-row
          class="list-item"
          v-for="(item, index) in huoyueLists"
          :key="index"
          type="flex"
          @click="toDetail(item.marketId)"
          justify="space-between"
          cente="center"
        >
          <van-col span="2">
            <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
            <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
            <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
          </van-col>
          <van-col span="6" class="icon-name">
            <van-image width="18px" height="18px" :src="item.marketLogo"></van-image>
            <span>{{ item.marketName }}</span>
          </van-col>
          <van-col span="8" style="text-align: right"> {{ enNumUnti(item.marketDayVolume * rateR) }}</van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.marketRankEx"></myprogress>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 关注 -->
      <div v-if="active === 5">
        <div class="login-box" v-if="!isLogin">
          <van-image width="140px" height="169px" :src="require('../../assets/image/空@2x.png')"></van-image>
          <span>{{$t('market.logintoseemore')}}</span>
          <van-button color="#E4BC31" @click="linkToLogin">{{$t('market.loginnow')}}</van-button>
        </div>
        <div v-else>
          <div v-if="!guanzhuList.length">
            <noData></noData>
          </div>
          <van-list v-else>
            <van-row
              class="list-item"
              v-for="(item, index) in guanzhuList"
              :key="index"
              type="flex"
              justify="space-between"
              cente="center"
            >
              <van-col span="2">
                <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
                <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
                <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
                <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index }}</van-tag>
              </van-col>
              <van-col span="6" class="icon-name">
                <van-image width="18px" height="18px" :src="item.marketLogo"></van-image>
                <span>{{ item.marketName }}</span>
              </van-col>
              <van-col span="6" style="text-align: right"> {{ enNumUnti(item.marketDayVolume * rateR) }} </van-col>
              <van-col span="10">
                <div class="guanzhu-start">
                  <myprogress :num="item.marketRankEx"></myprogress>
                  <van-image
                    @click="starClick(item.marketId)"
                    width="15px"
                    height="14px"
                    :src="require('../../assets/image/星星2@2x.png')"
                  ></van-image>
                </div>
              </van-col>
            </van-row>
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/filters/mixin'
import {
  marketChangePage,
  marketHoldPage,
  marketContractPage,
  marketOtcPage,
  marketActivePage,
  userMarketPage,
  userMarket
} from '@/api/platform'
import banner from '@/components/banner'
import search from '@/components/search'
import noData from '@/components/noData'
import myprogress from '@/components/myprogress'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      ercurrent: 1,
      erLists: [],
      sorterFlag1: 0,
      chiyouLists: [],
      sortchiyouFlag1: 0,
      loading: false,
      heyueLists: [],
      otcLists: [],
      sortotcFlag1: 0,
      huoyueLists: [],
      sorthuoyueFlag1: 0,
      rateR: null,
      rate: null,
      rateCode: null,
      guanzhuList: [],
      sortguanzhuFlag1: 0
    }
  },
  mixins: [mixin],
  // eslint-disable-next-line vue/no-unused-components
  components: { banner, search, myprogress, noData },
  computed: {
    ...mapGetters(['userName', 'isLogin', 'globalRate', 'languageId', 'globalRateArr'])
  },
  mounted() {
    // 获取ER排行
    this.marketChangePage()
    if (this.globalRateArr.length) {
      this.fn()
    }
  },
  watch: {
    globalRateArr: {
      handler(val) {
        val.length && this.fn()
      },
      deep: true
    }
  },
  methods: {
    // 关注排序
    sortguanzhu() {
      this.sortguanzhuFlag1++
      if (this.sortguanzhuFlag1 === 1) {
        this.guanzhuLists.sort((a, b) => {
          return a['marketDayVolume'] - b['marketDayVolume']
        })
      } else if (this.sortguanzhuFlag1 === 2) {
        this.guanzhuLists.sort((a, b) => {
          return b['marketDayVolume'] - a['marketDayVolume']
        })
      } else {
        this.guanzhuLists.sort((a, b) => {
          return a - b
        })
        this.sortguanzhuFlag1 = 0
      }
    },
    // 获取关注列表
    userMarketPage() {
      const data = {
        current: 1,
        size: 100
      }
      userMarketPage(data).then(res => {
        this.guanzhuList = res.records
      })
    },
    fn() {
      this.rateR = this.globalRate // 全局汇率,初始化赋值
      this.rate = this.languageId // CNY
      const obj = this.globalRateArr.filter(item => {
        return item.rateC === this.rate
      })
      this.rateCode = obj[0].rateCode
    },
    // 活跃平台排序
    sorthuoyueList() {
      this.sorthuoyueFlag1++
      if (this.sorthuoyueFlag1 === 1) {
        this.huoyueLists.sort((a, b) => {
          return a['marketDayVolume'] - b['marketDayVolume']
        })
      } else if (this.sorthuoyueFlag1 === 2) {
        this.huoyueLists.sort((a, b) => {
          return b['marketDayVolume'] - a['marketDayVolume']
        })
      } else {
        this.huoyueLists.sort((a, b) => {
          return a - b
        })
        this.sorthuoyueFlag1 = 0
      }
    },
    // 活跃平台list
    marketActivePage() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      marketActivePage(data).then(res => {
        this.huoyueLists = res.records
        this.loading = false
      })
    },
    // oct排序
    sortotcList() {
      this.sortotcFlag1++
      if (this.sortotcFlag1 === 1) {
        this.otcLists.sort((a, b) => {
          return a['marketDayVolume'] - b['marketDayVolume']
        })
      } else if (this.sortotcFlag1 === 2) {
        this.otcLists.sort((a, b) => {
          return b['marketDayVolume'] - a['marketDayVolume']
        })
      } else {
        this.otcLists.sort((a, b) => {
          return a - b
        })
        this.sortotcFlag1 = 0
      }
    },
    // otc列表
    marketOtcPage() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      marketOtcPage(data).then(res => {
        this.otcLists = res.records
        this.loading = false
      })
    },
    // 合约平台列表
    marketContractPage() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      marketContractPage(data).then(res => {
        this.heyueLists = res.records
        this.loading = false
      })
    },
    // 持有资产排序
    sortchiyouList() {
      this.sortchiyouFlag1++
      if (this.sortchiyouFlag1 === 1) {
        this.chiyouLists.sort((a, b) => {
          return a['marketDayVolume'] - b['marketDayVolume']
        })
      } else if (this.sortchiyouFlag1 === 2) {
        this.chiyouLists.sort((a, b) => {
          return b['marketDayVolume'] - a['marketDayVolume']
        })
      } else {
        this.chiyouLists.sort((a, b) => {
          return a - b
        })
        this.sortchiyouFlag1 = 0
      }
    },
    // er加载更多
    listMore() {
      this.ercurrent++
      this.marketChangePage()
    },
    // tab点击
    tabsClick(value) {
      switch (value) {
        case 0:
          this.marketChangePage()
          break
        case 1:
          this.marketHoldPage()
          break
        case 2:
          this.marketContractPage()
          break
        case 3:
          this.marketOtcPage()
          break
        case 4:
          this.marketActivePage()
          break
        case 5:
          this.userMarketPage()
      }
    },
    // 持有资产列表
    marketHoldPage() {
      this.loading = true
      const data = {
        current: 1,
        size: 100
      }
      marketHoldPage(data).then(res => {
        this.chiyouLists = res.records
        this.loading = false
      })
    },
    // ER排序
    sorterList() {
      this.sorterFlag1++
      if (this.sorterFlag1 === 1) {
        this.erLists.sort((a, b) => {
          return a['marketDayVolume'] - b['marketDayVolume']
        })
      } else if (this.sorterFlag1 === 2) {
        this.erLists.sort((a, b) => {
          return b['marketDayVolume'] - a['marketDayVolume']
        })
      } else {
        this.erLists.sort((a, b) => {
          return a - b
        })
        this.sorterFlag1 = 0
      }
    },
    // 获取ER排行list
    marketChangePage() {
      this.loading = true
      const data = {
        current: this.ercurrent,
        size: 100
      }
      marketChangePage(data).then(res => {
        this.erLists = [...this.erLists, ...res.records]
        this.loading = false
      })
    },
    // 选择汇率
    selectRate(value) {
      this.rate = value.rateC
      this.rateR = value.rateR
      this.rateCode = value.rateCode
      this.$refs.item.toggle()
    },

    // 去登陆页
    linkToLogin() {
      this.$router.push({
        name: 'Login'
      })
    },
    // 去详情页
    toDetail(id) {
      this.$router.push({
        path: '/platformDeatil',
        query: { id }
      })
    },
    // 关注列表点击星星
    starClick(id) {
      userMarket(id).then(res => {
        this.$toast(this.$t('market.unfollowed'))
        this.userMarketPage()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.about-container {
  .head {
    background: #fff;
    z-index: 10000;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .head-right {
      height: 100%;
      /deep/ .van-dropdown-menu__bar {
        box-shadow: none;
        margin-right: 20px;
      }
      /deep/ .van-dropdown-menu__title {
        color: #909090;
      }
      .rate-box {
        margin-top: 20px;
        padding: 30px 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 auto;
        .rate-item {
          padding: 15px 20px;
          color: #515a6e;
          text-align: center;
        }
      }
    }
    .head-left{
       padding-right: 30px;
      width: calc(100vw - 152px);
    }
  }
  .table-head {
    background: #fff;
    z-index: 10000;
    color: #999;
    font-size: 22px;
    border-top: 1px solid #d8d8d8;
    padding: 31px 28px 0 28px;
    .arrow-box {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      .img-box {
        margin-left: 15px;
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
  .list-box {
    padding: 0 28px;
    margin-bottom: 30px;
    position: relative;
    .list-more {
      font-size: 26px;
      text-align: center;
      color: rgb(228, 188, 49);
      line-height: 80px;
      height: 80px;
    }
    .list-item {
      border-bottom: 1px solid #eeeeee;
      padding: 22px 0;

      .icon-name {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          margin-left: 11px;
        }
      }
      .guanzhu-start {
        display: flex;
        flex-basis: row;
        justify-content: flex-end;
        align-items: center;
        .van-image {
          margin-left: 36px;
        }
      }
    }
    .heyue-box {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .margin-left {
        margin-left: 28px;
      }
    }
    .login-box {
      margin: 117px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        line-height: 37px;
      }
      .van-button {
        border-radius: 8px;
        margin-top: 19px;
        /deep/ .van-button__text {
          color: #fff;
        }
      }
    }
  }
}
</style>
