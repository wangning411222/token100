<template>
  <div class="search-page">
    <div class="search-head">
      <div class="head-left">
        <van-icon name="arrow-left" color="#666" @click="back" />
      </div>
      <van-search v-model="searchValue" show-action clearable placeholder="搜索币种/钱包/平台" @clear="clear">
        <template #action>
          <div @click="onSearch" class="search-text">搜索</div>
        </template></van-search
      >
    </div>
    <div class="search-body" v-if="!hotShow">
      <div class="head">
        <div class="head-left">
          <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31">
            <van-tab title="币种 "> </van-tab>
            <van-tab title="交易平台"> </van-tab>
            <van-tab title="钱包"> </van-tab>
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
      <!-- 币种 -->
      <div class="table-head" v-if="active === 0">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="4">币种</van-col>
          <van-col span="5">
            <div class="arrow-box" @click="bizhongSort('symbolMarketCapUsd')">
              <div>市值({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="bizhongFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="bizhongFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box" @click="bizhongSort('priceUsd')">
              <div>最新价 ({{ rateCode }})</div>
              <div class="img-box">
                <img v-if="bizhongFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="bizhongFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>24小时涨幅</div>
              <div class="img-box" @click="bizhongSort('priceChange1d')">
                <img v-if="bizhongFlag3 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="bizhongFlag3 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="1"></van-col>
        </van-row>
      </div>
      <!-- 平台 -->
      <div class="table-head" v-if="active === 1">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">交易所</van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortpingtaiList">
              <div>领涨/领跌</div>
              <div class="img-box">
                <img v-if="sortpingtaiFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortpingtaiFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="7" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
          <van-col span="2" offset="1"></van-col>
        </van-row>
      </div>
      <!-- 钱包 -->
      <div class="table-head" v-if="active === 2">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="8">名称</van-col>
          <van-col span="6">
            <div class="arrow-box" @click="sortqianbaoList('walletSecurity')">
              <div>安全性</div>
              <div class="img-box">
                <img v-if="sortqianbaoFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortqianbaoFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="arrow-box" @click="sortqianbaoList('walletStar')">
              <div>星级</div>
              <div class="img-box">
                <img v-if="sortqianbaoFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sortqianbaoFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="list-box">
        <!-- 币种 -->
        <div v-if="active === 0">
          <van-list>
            <van-row
              class="list-item"
              v-for="(item, index) in bizhongList"
              :key="index"
              type="flex"
              justify="space-between"
              cente="center"
              @click="toDetailbizhong(item.symbolId)"
            >
              <van-col span="2">
                <van-tag color="#E4BC31" v-if="item.symbolRank === 1">{{ item.symbolRank }}</van-tag>
                <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.symbolRank === 2">{{
                  item.symbolRank
                }}</van-tag>
                <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.symbolRank === 3">{{
                  item.symbolRank
                }}</van-tag>
                <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.symbolRank }}</van-tag>
              </van-col>
              <van-col span="4" class="icon-name">
                <div class="icon-name-top">
                  <van-image width="18px" height="18px" :src="item.symbolLogoUrl"></van-image>
                  <span>{{ item.symbolCode }}</span>
                </div>
                <div class="bicon-name-bottom">{{ item.symbolName }}</div>
              </van-col>
              <van-col span="5" style="text-align: right"> {{ enNumUnti(item.symbolMarketCapUsd * rateR) }} </van-col>
              <van-col span="6" style="text-align: right">
                <div>{{ enNumUnti(item.priceUsd * rateR) }}</div>
              </van-col>
              <van-col
                span="6"
                style="text-align: center"
                :class="item.priceChange1d.toString().indexOf('-') >= 0 ? 'red' : 'green'"
              >
                <div>{{ (item.priceChange1d * 100).toFixed(2) }}%</div>
              </van-col>
              <van-col span="1">
                <van-image
                  @click.stop="starClickbizhong(item.symbolId)"
                  width="16px"
                  height="15px"
                  :src="require('../../assets/image/星星2@2x(1).png')"
                ></van-image>
              </van-col>
            </van-row>
          </van-list>
        </div>
        <!-- 平台 -->
        <div v-else-if="active === 1">
          <van-list>
            <van-row
              class="list-item"
              v-for="(item, index) in pingtaiList"
              :key="index"
              type="flex"
              justify="space-between"
              cente="center"
              @click="toDetailpingtai(item.marketId)"
            >
              <van-col span="2">
                <van-tag color="#E4BC31" v-if="item.marketRank === 1">{{ item.marketRank }}</van-tag>
                <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="item.marketRank === 2">{{
                  item.marketRank
                }}</van-tag>
                <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="item.marketRank === 3">{{
                  item.marketRank
                }}</van-tag>
                <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ item.marketRank }}</van-tag>
              </van-col>
              <van-col span="6" class="icon-name1">
                <van-image width="18px" height="18px" :src="item.marketLogo"></van-image>
                <span>{{ item.marketName }}</span>
              </van-col>
              <van-col span="6" style="text-align: right"> {{ enNumUnti(item.marketDayVolume * rateR) }} </van-col>
              <van-col span="7" style="text-align: right">
                <div>
                  <myprogress :num="item.marketRankEx"></myprogress>
                </div>
              </van-col>
              <van-col span="2" offset="1">

                <van-image
                  @click.stop="starClickpingtai(item.marketId)"
                  width="16px"
                  height="15px"
                  :src="require('../../assets/image/星星2@2x(1).png')"
                ></van-image>
              </van-col>
            </van-row>
          </van-list>
        </div>
        <!-- 钱包 -->
        <div v-else>
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
                <div class="right-txt">安全性:{{ item.walletSecurity | walletSecurity }}</div>
              </div>
            </van-cell>
          </van-list>
        </div>
      </div>
    </div>
    <div class="search-content" v-else>
      <h3>热门搜索</h3>
      <div>
        <van-tag
          v-for="(item, index) in hostList"
          :key="index"
          color="#F9F9F8"
          text-color="#9B9B9B"
          @click="hotClick(item)"
          size="large"
          >{{ item.searchHotName }}</van-tag
        >
      </div>
    </div>
  </div>
</template>
<script>
import { searchHotList, searchPage } from '@/api/search'
import { userSymbol } from '@/api/market'
import { userMarket } from '@/api/platform'
import mixin from '@/filters/mixin'
import myprogress from '@/components/myprogress'
import noData from '@/components/noData'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchValue: '',
      hostList: [],
      active: 0,
      rateR: null, // 汇率
      rate: null, // CNY
      rateCode: null, // $
      hotShow: true,
      bizhongFlag1: 0,
      bizhongFlag2: 0,
      bizhongFlag3: 0,
      bizhongList: [],
      sortpingtaiFlag1: 0,
      pingtaiList: [],
      sortqianbaoFlag2: 0,
      sortqianbaoFlag1: 0
    }
  },
  filters: {
    walletSecurity(value) {
      switch (value) {
        case 1:
          return '低'
        case 2:
          return '较低'
        case 3:
          return '中等'
        case 4:
          return '较高'
        case 5:
          return '高'
      }
    }
  },
  mixins: [mixin],
  // eslint-disable-next-line vue/no-unused-components
  components: { myprogress, noData },
  computed: {
    ...mapGetters(['userName', 'isLogin', 'globalRate', 'languageId', 'globalRateArr'])
  },
  created() {
    this.searchHotList()
  },
  mounted() {
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
    // 钱包详情页
    toWalletDetail(id) {
      this.$router.push({
        path: '/walletDetail',
        query: { id }
      })
    },
    // 平台详情
    toDetailpingtai(id) {
      this.$router.push({
        path: '/platformDeatil',
        query: { id }
      })
    },
    // 币种详情
    toDetailbizhong(id) {
      this.$router.push({
        path: '/marketDetail',
        query: {
          id
        }
      })
    },
    // 平台关注
    starClickpingtai(id) {
      if (this.isLogin) {
        userMarket(id).then(res => {
          this.$toast('已取消关注')
          this.userMarketPage()
        })
      } else {
        this.$toast('请先登录')
      }
    },
    // 币种关注
    starClickbizhong(id) {
      if (this.isLogin) {
        userSymbol(id).then(res => {
          this.$toast('已关注')
        })
      } else {
        this.$toast('请先登录')
      }
    },
    // 点击清除
    clear() {
      this.hotShow = true
    },
    // 钱包排序
    sortqianbaoList(key) {
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
    // 平台排序
    sortpingtaiList() {
      this.sortpingtaiFlag1++
      if (this.sortpingtaiFlag1 === 1) {
        this.pingtaiList.sort((a, b) => {
          return a['marketDayVolume'] - b['marketDayVolume']
        })
      } else if (this.sortpingtaiFlag1 === 2) {
        this.pingtaiList.sort((a, b) => {
          return b['marketDayVolume'] - a['marketDayVolume']
        })
      } else {
        this.pingtaiList.sort((a, b) => {
          return a['marketRank'] - b['marketRank']
        })
        this.sortpingtaiFlag1 = 0
      }
    },
    // 获取列表
    searchPage() {
      const data = {
        classify: this.active,
        current: 1,
        size: 100,
        keywords: this.searchValue
      }
      searchPage(data).then(res => {
        this.bizhongList = res.rankIPage.records
        this.pingtaiList = res.changeIPage.records
        this.qianbaoList = res.walletIPage.records
      })
    },
    // 币种排序
    bizhongSort(key) {
      if (key === 'symbolMarketCapUsd') {
        this.bizhongFlag1++
        if (this.bizhongFlag1 === 1) {
          this.bizhongList.sort((a, b) => {
            return a['symbolMarketCapUsd'] - b['symbolMarketCapUsd']
          })
        } else if (this.bizhongFlag1 === 2) {
          this.bizhongList.sort((a, b) => {
            return b['symbolMarketCapUsd'] - a['symbolMarketCapUsd']
          })
        } else {
          this.bizhongList.sort((a, b) => {
            return a['symbolRank'] - b['symbolRank']
          })
          this.bizhongFlag1 = 0
        }
      } else if (key === 'priceUsd') {
        this.bizhongFlag2++
        if (this.bizhongFlag2 === 1) {
          this.bizhongList.sort((a, b) => {
            return a['priceUsd'] - b['priceUsd']
          })
        } else if (this.bizhongFlag2 === 2) {
          this.bizhongList.sort((a, b) => {
            return b['priceUsd'] - a['priceUsd']
          })
        } else {
          this.bizhongList.sort((a, b) => {
            return a['symbolRank'] - b['symbolRank']
          })
          this.bizhongFlag2 = 0
        }
      } else {
        this.bizhongFlag3++
        if (this.bizhongFlag3 === 1) {
          this.bizhongList.sort((a, b) => {
            return a['priceChange1d'] - b['priceChange1d']
          })
        } else if (this.bizhongFlag3 === 2) {
          this.bizhongList.sort((a, b) => {
            return b['priceChange1d'] - a['priceChange1d']
          })
        } else {
          this.bizhongList.sort((a, b) => {
            return a['symbolRank'] - b['symbolRank']
          })
          this.bizhongFlag3 = 0
        }
      }
    },
    // / 选择汇率
    selectRate(value) {
      this.rate = value.rateC
      this.rateR = value.rateR
      this.rateCode = value.rateCode
      this.$refs.item.toggle()
    },
    fn() {
      this.rateR = this.globalRate // 全局汇率,初始化赋值
      this.rate = this.languageId // CNY
      const obj = this.globalRateArr.filter(item => {
        return item.rateC === this.rate
      })
      this.rateCode = obj[0].rateCode
    },
    // 点击热门标签
    hotClick(item) {
      this.hotShow = false
      this.searchValue = item.searchHotName
      this.searchPage()
    },
    // 热门列表
    searchHotList() {
      searchHotList().then(res => {
        this.hostList = res
      })
    },
    // 搜索
    onSearch() {
      this.hotShow = false
      this.searchPage()
    },
    // 返回
    back() {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.red {
  color: #e86d7c;
}
.gray {
  color: #939ea9;
}
.green {
  color: #00a287;
}
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

.search-content {
  margin: 30px 24px;
  h3 {
    font-size: 30px;
    color: #333;
  }
  .van-tag {
    margin-right: 22px;
  }
}
.search-body {
  .head {
    background: #fff;
    z-index: 10000;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .head-left {
      flex-basis: 60%;
    }
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
    position: relative;
    margin-bottom: 30px;
    .list-more {
      font-size: 26px;
      text-align: center;
      color: rgb(228, 188, 49);
      line-height: 80px;
      height: 80px;
    }
    padding: 0 28px;
    .list-item {
      border-bottom: 1px solid #eeeeee;
      padding: 22px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon-name {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        .icon-name-top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          span {
            flex-grow: 1;
            margin-left: 11px;
            overflow: hidden; /* 溢出隐藏 */
            word-break: keep-all; /* 不换行 */
            white-space: nowrap; /* 不换行 */
            text-overflow: ellipsis; /* ...代替隐藏的内容 */
          }
          .base125 {
            max-width: 125px;
          }
          .base100 {
            max-width: 100px;
          }
          .base185 {
            max-width: 120px;
          }
          .base218 {
            max-width: 250px;
          }
        }
        .bicon-name-bottom {
          margin-top: 6px;
          color: #92959c;
          font-size: 24px;
          overflow: hidden;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .xinbi-bottom {
          max-width: 185px;
        }
        .huanshou {
          max-width: 125px;
        }
        .resou {
          max-width: 250px;
        }
      }
      .icon-name1 {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        span {
          flex-grow: 1;
          margin-left: 11px;
          overflow: hidden; /* 溢出隐藏 */
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* ...代替隐藏的内容 */
        }
      }
      .gainian {
        span {
          color: #333;
          font-size: 22px;
        }
        .green {
          color: #00a287;
        }
        .red {
          color: #da5949;
        }
      }
      .greenprogress {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        & > div:last-child {
          margin-top: 13px;
          color: #333;
          font-size: 20px;
        }
      }
    }
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
