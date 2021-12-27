<template>
  <div>
    <van-sticky>
      <van-nav-bar :title="$t('market.conceptofdetails')" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="concept">
      <div class="concept-head" v-if="dataObj">
        <h3>{{dataObj.name}}</h3>
        <div class="num-box">
          <div class="concept-num">
            <div class="num-top">{{$t('market.averageriseorfall')}}</div>
            <div class="font-big font-green">{{dataObj.averagePercent.toFixed(2)}}%</div>
          </div>
          <div class="concept-num">
            <div class="num-top">{{$t('market.goup')}}</div>
            <div class="num-bottom font-red">{{dataObj.riseCount}}</div>
          </div>
          <div class="concept-num">
            <div class="num-top">{{$t('market.godown')}}</div>
            <div class="num-bottom font-green">{{dataObj.dropCount}}</div>
          </div>
          <div class="concept-num">
            <div class="num-top">{{$t('market.totalnumberofcurrencies')}}</div>
            <div class="num-bottom">{{dataObj.totalCoin}}</div>
          </div>
        </div>
        <div class="bar">
          <span class="rise"></span>
          <span class="text_rise">
            {{$t('market.leading')}}{{dataObj.best}}
            <span class="textGreen">+{{dataObj.bestPercent.toFixed(2)}}%</span></span
          >
          <span class="text_drop">
            <span class="textGreen">-{{dataObj.worstPercent.toFixed(2)}}%</span>
            {{$t('market.ledby')}}{{dataObj.worst}}
          </span>
        </div>
      </div>
      <div class="line-gray"></div>
      <div class="concept-list">
        <div class="list-head">
          <h3>{{$t('market.globalexchangequotation0')}}</h3>
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
                      @click="selectRate( item)"
                    >{{ item.rateName }}&nbsp;{{ item.rateC }}</van-col
                    >
                  </van-row>
                </div>
              </van-dropdown-item>
            </van-dropdown-menu>
          </div>
        </div>
        <div class="table-head">
          <van-row type="flex" justify="space-between" cente="center">
            <van-col span="2">#</van-col>
            <van-col span="4">{{$t('market.currency')}}</van-col>
            <van-col span="6">
              <div class="arrow-box" @click="sorthangqing('marketValue')">
                <div>{{$t('market.marketvalue')}} ({{rateCode}})</div>
                <div class="img-box">
                   <img v-if="sorthangqingFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sorthangqingFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="arrow-box" @click="sorthangqing('currentPrice')">
                <div>{{$t('market.latestprice')}} ({{rateCode}})</div>
                <div class="img-box">
                   <img v-if="sorthangqingFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sorthangqingFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="arrow-box" @click="sorthangqing('changePercent')">
                <div>24H{{$t('market.amountofincrease')}}</div>
                <div class="img-box">
                    <img v-if="sorthangqingFlag3 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sorthangqingFlag3 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <van-list>
          <van-row
            class="list-item"
            v-for="(item, index) in hangqingList"
            :key="index"
            type="flex"
            justify="space-between"
            cente="center"
            @click="toDetail(item.symbolId)"
          >
            <van-col span="2">
              <van-tag color="#E4BC31" v-if="index === 0">1</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.7)" v-else-if="index === 1">2</van-tag>
              <van-tag color="rgba(228, 188, 49, 0.4)" v-else-if="index === 2">3</van-tag>
              <van-tag color="rgba(221, 222, 226, 1)" v-else>{{ index+1 }}</van-tag>
            </van-col>
            <van-col span="4" class="icon-name">
              <div class="icon-name-top">
                <van-image width="18px" height="18px" :src="item.logo"></van-image>
                <span class="base125">{{ item.name }}</span>
              </div>
              <div class="bicon-name-bottom base125">{{item.code}}</div>
            </van-col>
            <van-col span="6" style="text-align: right"> {{ enNumUnti(item.marketValue*rateR) }} </van-col>
            <van-col span="6" style="text-align: right">
              <div>{{enNumUnti((item.currentPrice*rateR).toFixed(4))}}</div>
            </van-col>
            <van-col span="6" style="text-align: right" :class="item.changePercent.toString().indexOf('-')>=0?'red':'green'">
              <div>{{item.changePercent.toFixed(2)}}%</div>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@/filters/mixin'
import { mapGetters } from 'vuex'
import { symbolConcept } from '@/api/market'
export default {
  data() {
    return {
      id: null,
      dataObj: null,
      sorthangqingFlag1: 0,
      sorthangqingFlag2: 0,

      sorthangqingFlag3: 0,
      hangqingList: [],
      rateR: null,
      rate: null,
      rateCode: null
    }
  },
  mixins: [mixin],
  mounted() {
    this.id = this.$route.query.id
    this.symbolConcept()
    if (this.globalRateArr.length) {
      this.fn()
    }
  },
  computed: {
    ...mapGetters(['userName', 'isLogin', 'globalRate', 'languageId', 'globalRateArr'])
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
    fn() {
      this.rateR = this.globalRate // 全局汇率,初始化赋值
      this.rate = this.languageId // CNY
      const obj = this.globalRateArr.filter(item => {
        return item.rateC === this.rate
      })
      this.rateCode = obj[0].rateCode
    },
    // 行情排序
    sorthangqing(key) {
      if (key === 'marketValue') {
        this.sorthangqingFlag1++
        if (this.sorthangqingFlag1 === 1) {
          this.hangqingList.sort((a, b) => {
            return a['marketValue'] - b['marketValue']
          })
        } else if (this.sorthangqingFlag1 === 2) {
          this.hangqingList.sort((a, b) => {
            return b['marketValue'] - a['marketValue']
          })
        } else {
          this.hangqingList.sort((a, b) => {
            return a - b
          })
          this.sorthangqingFlag1 = 0
        }
      } else if (key === 'currentPrice') {
        this.sorthangqingFlag2++
        if (this.sorthangqingFlag2 === 1) {
          this.hangqingList.sort((a, b) => {
            return a['currentPrice'] - b['currentPrice']
          })
        } else if (this.sorthangqingFlag2 === 2) {
          this.hangqingList.sort((a, b) => {
            return b['currentPrice'] - a['currentPrice']
          })
        } else {
          this.hangqingList.sort((a, b) => {
            return a - b
          })
          this.sorthangqingFlag2 = 0
        }
      } else {
        this.sorthangqingFlag3++
        if (this.sorthangqingFlag3 === 1) {
          this.hangqingList.sort((a, b) => {
            return a['changePercent'] - b['changePercent']
          })
        } else if (this.sorthangqingFlag3 === 2) {
          this.hangqingList.sort((a, b) => {
            return b['changePercent'] - a['changePercent']
          })
        } else {
          this.hangqingList.sort((a, b) => {
            return a - b
          })
          this.sorthangqingFlag3 = 0
        }
      }
    },
    // 获取概念详情
    symbolConcept() {
      const data = {
        conceptId: this.id
      }
      symbolConcept(data).then(res => {
        this.dataObj = res.detail
        this.hangqingList = res.childList
      })
    },
    // 选择汇率
    selectRate(value) {
      this.rate = value.rateC
      this.rateR = value.rateR
      this.rateCode = value.rateCode
      this.$refs.item.toggle()
    },
    // 详情页
    toDetail(id) {
      this.$router.push({
        path: '/marketDetail',
        query: { id }
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
  }
}
</script>
<style lang="scss" scoped>
.concept {
   .red {
    color: #e86d7c;
  }
  .gray {
    color: #939ea9;
  }
  .green {
    color: #00a287;
  }
  .concept-head {
    margin: 24px 0 32px 28px;
    h3 {
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
    }
    .num-box {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      .concept-num {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .num-top {
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #999999;
          margin-bottom: 20px;
        }
        .num-bottom {
          font-size: 24px;
          color: #333;
        }
        .font-big {
          font-size: 39px;
        }
        .font-green {
          color: #0ab45a;
        }
        .font-red {
          color: #ff6059;
        }
      }
    }
    .bar {
      background: #ff6059;
      height: 48px;
      margin-top: 30px;
      margin-bottom: 32px;
      line-height: 48px;
      color: #fff;
      overflow: hidden;
      position: relative;
      width: 700px;
      .rise {
        width: 54%;
        float: left;
        background: #0ab45a;
        height: 48px;
        -webkit-transform: skewX(-30deg);
        transform: skewX(-30deg);
        border-right: 12px solid #fff;
        margin-left: -18px;
      }
      .drop {
        width: 50%;
        float: right;
        height: 0.52rem;
        margin-top: -0.02rem;
      }
      .text_rise {
        position: absolute;
        left: 15px;
        top: 0;
        font-size: 24px;
        span {
          color: #fff !important;
          margin-left: 16px;
        }
      }
      .text_drop {
        position: absolute;
        right: 16px;
        top: 0;
        font-size: 24px;
        span {
          color: #fff !important;
          margin-right: 16px;
        }
      }
    }
  }
  .line-gray {
    border-top: 19px solid #f5f5f5;
  }
  .concept-list {
    .list-head {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-left: 24px;
      h3 {
        font-size: 32px;
        color: #4a4a4a;
      }
      .head-right {
        height: 100%;
        /deep/ .van-dropdown-menu__bar {
          box-shadow: none;
        }
        /deep/ .van-ellipsis {
          font-size: 28px;
          margin-right: 20px;
        }
        /deep/ .van-dropdown-menu__title {
          color: #909090;
          padding: 0;
          margin-right: 40px;
          z-index: 1000;
          background: #fff;
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
      color: #999;
      font-size: 22px;
      padding: 0 28px;
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
    .list-item {
      border-bottom: 1px solid #eeeeee;
      padding: 22px 28px;
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
          justify-content: flex-start;
          align-items: center;
          span {
            margin-left: 11px;
            overflow: hidden; /* 溢出隐藏 */
            word-break: keep-all; /* 不换行 */
            white-space: nowrap; /* 不换行 */
            text-overflow: ellipsis; /* ...代替隐藏的内容 */
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
        .base125{
          max-width: 125px;
        }
      }
    }
  }
}
</style>
