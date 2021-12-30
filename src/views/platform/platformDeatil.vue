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
      <div class="head-top" v-if="detailObj">
        <div class="top-left">
          <van-image
            width="51px"
            height="50px"
            :src="detailObj.marketLogo"
          ></van-image>
        </div>
        <div class="top-right">
          <div class="right-line1">
            <div class="line1-left">
              <div>{{detailObj.marketName}}</div>
              <van-tag type="success">ER{{detailObj.marketRankEx}}</van-tag>
            </div>
            <van-image
              @click="collect"
              v-if="isLogin&&detailObj.attention"
              width="16px"
              height="15px"
              :src="require('../../assets/image/星星2@2x.png')"
            ></van-image>
            <van-image
              @click="collect"
              v-else
              width="16px"
              height="15px"
              :src="require('../../assets/image/星星2@2x(1).png')"
            ></van-image>
          </div>
          <div class="right-line2">
            <div class="light">
              <van-image width="11px" height="10px" :src="require('../../assets/image/灯泡@2x.png')"></van-image>
              <div>NO.{{detailObj.marketRank}}</div>
            </div>
            <div>24H{{$t('plantform.Platformtransactionvolume')}}</div>
            <div>¥{{cnNumUnti(detailObj.marketDayVolume)}}</div>
          </div>
        </div>
      </div>
      <!-- <div class="head-center">
        <div class="center-left">
          <div>BTC</div>
          <div>比特币</div>
          <div>$6.95万亿</div>
        </div>
        <div class="center-right">-0.32%</div>
      </div> -->
      <div class="chart-select">
        <div class="chart-title">{{$t('plantform.Turnovertrend')}}</div>
        <div>
          <ul>
            <li
              v-for="(item, index) in timeArr"
              :key="index"
              :class="chartActive === item.value ? 'color-active' : 'color-inactive'"
              @click="selectTime(item.value)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
      <div class="chart-box">
        <div class="tip" v-show="tipShow">
          <div>{{ chartTime }} 00:00</div>
          <div>{{$t('plantform.volumetransaction')}}:${{ chartNum }}</div>
        </div>
        <div id="mychart"></div>
      </div>
    </div>
    <div class="head">
      <div class="head-left">
        <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" @click="tabsClick">
          <van-tab :title="$t('market.market')"> </van-tab>
          <van-tab :title="$t('market.briefing')"> </van-tab>
          <van-tab :title="$t('plantform.announcement')"> </van-tab>
        </van-tabs>
      </div>
      <div class="head-right">
        <van-dropdown-menu v-if="active===0">
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
    <div class="table-head" v-if="active === 0">
      <van-row type="flex" justify="space-between" cente="center">
        <van-col span="2">#</van-col>
        <van-col span="4" style="padding-right:5px;">{{$t('market.tradingon')}}</van-col>
        <van-col span="6" style="padding-left:5px;">
          <div class="arrow-box"  @click="sorthangqingList('changeDaily')">
            <div>{{$t('plantform.platformprice')}}</div>
            <div class="img-box">
                <img v-if="sorthangqingFlag1 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sorthangqingFlag1 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="arrow-box"  @click="sorthangqingList('changeDaily1')">
            <div>{{$t('market.latestprice')}}</div>
            <div class="img-box">
                <img v-if="sorthangqingFlag2 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sorthangqingFlag2 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="arrow-box"  @click="sorthangqingList('marketScale')">
            <div>{{$t('plantform.proportion')}}</div>
            <div class="img-box">
                <img v-if="sorthangqingFlag3 === 0" src="../../assets/icon/arrow_0.png" alt="" />
                <img v-else-if="sorthangqingFlag3 === 1" src="../../assets/icon/arrow_1.png" alt="" />
                <img v-else src="../../assets/icon/arrow_2.png" alt="" />
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="list-box">
      <van-list v-if="active === 0">
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
              <van-image width="18px" height="18px" :src="item.symbolLogo"></van-image>
              <span>{{ item.symbolName }}</span>
            </div>
            <div class="bicon-name-bottom base125">{{item.marketName}}/{{item.rateName}}</div>
          </van-col>
          <van-col span="6" style="text-align: right">{{enNumUnti(item.lastPrice*rateR) }} </van-col>
          <van-col span="6" style="text-align: right">
            <div> {{ enNumUnti(item.lastPrice) }}</div>
          </van-col>
          <van-col span="6" style="text-align: right">
            <div>{{item.marketScale&&(item.marketScale*100).toFixed(2)}}%</div>
          </van-col>
        </van-row>
      </van-list>
      <van-list v-if="active === 1">
        <div class="profiles-box" v-if="detailObj">
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left">{{$t('plantform.country')}}/{{$t('plantform.region')}}</van-col>
            <van-col span="18" class="profiles-right">{{detailObj.marketCountry}}</van-col>
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left">{{$t('plantform.Transactionsupport')}}</van-col>
            <van-col span="18" class="profiles-right">{{detailObj.marketSupport}}</van-col>
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left"> {{$t('market.tradingon')}}</van-col>
            <van-col span="18" class="profiles-right">{{enNumUnti(detailObj.marketExpectedVolume)}}个 </van-col>
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left"> {{$t('plantform.Tradesector')}}</van-col>
            <van-col span="18" class="profiles-right">
             {{detailObj.marketDescName}}</van-col
            >
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left"> {{$t('plantform.synopsis')}}</van-col>
            <van-col
class="profiles-right unfold"
span="18"
              >

              <p :class="!unfoldTxt ? 'p2-show' : ''">
              {{detailObj.marketContent}}
              </p>
              <span @click="unfoldClick">{{ unfoldTxt ? $t('plantform.unfold') : $t('plantform.putaway') }}</span>
            </van-col>
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left">{{$t('market.relatedlinks')}}</van-col>
            <van-col span="18" class="profiles-right link-box">
              <div>{{detailObj.marketWebsiteUrl}}</div>
              <div>
                <span v-for="(item,index) in detailObj.marketLinks.split(',')" :key="index"><a :href="item">{{$t('plantform.standbyaddress')}}{{index+1}}</a></span>

              </div>
              <div>
                <span> <a href="https://www.facebook.com/binanceexchange">Facebook</a>  </span>
                <span><a href="https://twitter.com/binance">Twitter</a> </span>
                <span> {{$t('plantform.microblog')}} </span>
              </div></van-col
            >
          </van-row>
        </div>
      </van-list>
      <van-list v-if="active === 2">
        <div class="notic-box">
          <div class="notic-item" v-for="(item, index) in noticList" :key="index" @click="toRich(item.newsId)">

            <div class="notic-top">{{item.newsTitle}}</div>
            <div class="notic-bottom">{{$moment(item.newsDateTime).format('MM-DD hh:mm')}}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import mixin from '@/filters/mixin'
import { marketInfo, marketKline, marketTickerPage, marketNews, userMarket } from '@/api/platform'
import * as echarts from 'echarts'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      result: [], // chart 数据
      chartTime: null, // 点击显示的时间
      chartNum: null, // 点击显示的金钱
      myChart: null,
      tipShow: false,
      chartActive: 0,
      timeArr: [
        {
          label: this.$t('market.all'),
          value: 0
        },
        {
          label: this.$t('plantform.day7'),
          value: 1
        },
        {
          label: this.$t('plantform.day30'),
          value: 2
        },
        {
          label: this.$t('market.year'),
          value: 3
        }
      ],
      unfoldTxt: true,
      noticList: [], // 公告列表
      marketId: null,
      detailObj: null,
      sorthangqingFlag1: 0,
      sorthangqingFlag2: 0,
      sorthangqingFlag3: 0,
      hangqingList: [],
      rateR: null,
      rate: null,
      rateCode: null
    }
  },
  computed: {
    ...mapGetters(['userName', 'isLogin', 'globalRate', 'languageId', 'globalRateArr'])
  },
  mixins: [mixin],
  mounted() {
    this.myChart = echarts.init(document.getElementById('mychart'))
    // 获取id
    this.marketId = this.$route.query.id
    // 获取交易所详情
    this.marketInfo()
    // 获取K线数据
    this.marketKline()
    this.marketTickerPage()
    // 获取行情
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
    fn() {
      this.rateR = this.globalRate // 全局汇率,初始化赋值
      this.rate = this.languageId // CNY
      const obj = this.globalRateArr.filter(item => {
        return item.rateC === this.rate
      })
      this.rateCode = obj[0].rateCode
    },
    // tab点击事件
    tabsClick(value) {
      if (value === 0) {
        this.marketTickerPage()
      } else if (value === 2) {
        this.marketNews()
      }
    },
    // 公告列表
    marketNews() {
      const data = {
        marketId: this.marketId,
        current: 1,
        size: 100
      }
      marketNews(data).then(res => {
        this.noticList = res.records
      })
    },
    // 行情排序
    sorthangqingList(key) {
      if (key === 'changeDaily') {
        this.sorthangqingFlag1++
        if (this.sorthangqingFlag1 === 1) {
          this.hangqingList.sort((a, b) => {
            return a['changeDaily'] - b['changeDaily']
          })
        } else if (this.sorthangqingFlag1 === 2) {
          this.hangqingList.sort((a, b) => {
            return b['changeDaily'] - a['changeDaily']
          })
        } else {
          this.hangqingList.sort((a, b) => {
            return a - b
          })
          this.sorthangqingFlag1 = 0
        }
      } else if (key === 'changeDaily1') {
        this.sorthangqingFlag2++
        if (this.sorthangqingFlag2 === 1) {
          this.hangqingList.sort((a, b) => {
            return a['changeDaily'] - b['changeDaily']
          })
        } else if (this.sorthangqingFlag2 === 2) {
          this.hangqingList.sort((a, b) => {
            return b['changeDaily'] - a['changeDaily']
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
            return a['marketScale'] - b['marketScale']
          })
        } else if (this.sorthangqingFlag3 === 2) {
          this.hangqingList.sort((a, b) => {
            return b['marketScale'] - a['marketScale']
          })
        } else {
          this.hangqingList.sort((a, b) => {
            return a - b
          })
          this.sorthangqingFlag3 = 0
        }
      }
    },
    // 获取行情列表
    marketTickerPage() {
      const data = {
        marketId: this.marketId,
        current: 1,
        size: 100
      }
      marketTickerPage(data).then(res => {
        this.hangqingList = res.records
      })
    },
    // 获取k线数据
    marketKline() {
      const data = {
        marketId: this.marketId,
        classify: this.chartActive
      }
      marketKline(data).then(res => {
        this.result = res
        this.initChart()
      })
    },
    // 获取交易所详情
    marketInfo() {
      marketInfo(this.marketId).then(res => {
        this.detailObj = res
      })
    },
    // 选择汇率
    selectRate(value) {
      this.rate = value.rateC
      this.rateR = value.rateR
      this.rateCode = value.rateCode
      this.$refs.item.toggle()
    },

    // 点击chart时间选择
    selectTime(value) {
      this.chartActive = value
      this.marketKline()
    },
    // 点击公告
    toRich(id) {
      this.$router.push({
        path: '/detail',
        query: { id }
      })
    },
    // 点击展开
    unfoldClick() {
      this.unfoldTxt = !this.unfoldTxt
    },
    // 去详情页
    toDetail(id) {
      this.$router.push({
        path: '/marketDetail',
        query: { id }
      })
    },
    initChart() {
      this.tipShow = false
      const that = this
      // 基于准备好的dom，初始化echarts实例

      var option
      const xArr = this.result.map(item => {
        return that.$moment(item.timestamp).format('MM-DD,YYYY')
      })
      const yArr = this.result.map(item => {
        return item.volume
      })
      const interval = Math.ceil(this.result.length / 5)
      option = {
        // 提示框
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              show: false
            },
            type: 'cross'
          },
          showContent: false
        },

        grid: {
          left: '5%', // 与容器左侧的距离
          right: '5%', // 与容器右侧的距离
          top: '10%', // 与容器顶部的距离
          bottom: '0', // 与容器底部的距离
          borderWidth: 10,
          containLabel: true
        },
        xAxis: {
          // axisPointer:{
          //   show:true
          // },
          snap: true,
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },

          triggerEvent: false,
          data: xArr,
          axisLabel: {
            color: '#ccc',
            fontSize: 10,
            formatter: function(params) {
              return params.replace(',', '\n')
            },
            interval: interval
          }
        },
        yAxis: {
          //  axisPointer:{
          //   show:true
          // },
          scale: true,
          axisTick: {
            show: false // 展示刻度
          },
          axisLine: {
            show: false // 展示边线
          },
          splitLine: {
            show: false // 分割线
          },
          position: 'right',
          type: 'value',
          splitNumber: 2,
          axisLabel: {
            inside: true, // 文字朝向,true里面
            color: '#ccc',
            fontSize: 10,
            formatter: function(value) {
              if (value >= 100000000) {
                return Math.round(value / 100000000) + that.$t('market.million')
              } else if (value >= 10000) {
                return Math.round(value / 10000) + that.$t('market.thousand')
              } else {
                return Math.round(value)
              }
            }
          }
        },
        series: [
          {
            data: yArr,
            type: 'line',
            symbol: 'circle', // 折点设定为实心点
            symbolSize: 1,
            itemStyle: {
              color: '#3D8FFD'
            },
            lineStyle: {
              color: '#3D8FFD'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#CEF5FF'
                  },
                  {
                    offset: 1,
                    color: '#CEF5FF00'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
      option && this.myChart.setOption(option)

      this.myChart.getZr().on('click', params => {
        this.chartClick(params)
      })
    },
    // chart点击事件
    chartClick(params) {
      const pointInPixel = [params.offsetX, params.offsetY]
      // 使用 convertFromPixel方法 转换像素坐标值到逻辑坐标系上的点。获取点击位置对应的x轴数据的索引值，借助于索引值的获取到其它的信息
      const pointInGrid = this.myChart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)
      // 点击的坐标点
      const clickIndex = pointInGrid[0]
      // 获取当前点击位置要的数据
      const time = this.result[clickIndex].timestamp
      this.chartTime = this.$moment(time).format('YYYY-MM-DD')
      this.chartNum = this.enNumUnti(this.result[clickIndex].volume)
      this.tipShow = true
    },
    // 点击小星星
    collect() {
      if (this.isLogin) {
        userMarket(this.marketId).then(res => {
          this.detailObj.attention = true
          this.$toast.success(this.$t('plantform.Collectionsuccess'))
        })
      } else {
        this.$toast(this.$t('plantform.placelogin'))
      }
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
      border-bottom: 19px solid #f3f3f3;
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
        margin-top: 32px;
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
          margin-left: 64px;
        }
      }
    }
    .head-center {

      border-bottom: 19px solid #f3f3f3;
      padding: 23px 28px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .center-left {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-family: PingFangSC-Medium, PingFang SC;
        align-items: center;
        & > div:first-child {
          font-size: 30px;
          font-weight: 500;
          color: #333333;
        }
        & > div:nth-child(2) {
          font-size: 24px;
          font-weight: 400;
          color: #92959c;
          margin-left: 27px;
        }
        & > div:last-child {
          font-size: 30px;
          font-weight: 400;
          color: #333333;
          margin-left: 56px;
        }
      }
      .center-right {
        font-size: 30px;
        color: #e86b7a;
      }
    }
    .chart-select {
      padding: 40px 28px 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .chart-title {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #e4bc31;
      }
      ul {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        li {
          text-align: center;
          width: 119px;
          height: 55px;
          line-height: 55px;
          border: 1px solid #eeeeee;
          border-radius: 5px 0px 0px 5px;
        }
        .color-active {
          background: #e4bc31;
          color: #fff;
        }
        .clolor-inactive {
          background: #fff;
          color: #808080;
        }
      }
    }
    .chart-box {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      // width: 100vw;
      // overflow-x: hidden;
      position: relative;
      .tip {
        position: absolute;
        top: 10px;
        left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #939ea9;
        font-size: 0.01rem;
      }
      #mychart {
        width: 100%;
        height: 304px;
        & > div {
          width: 100%;
        }
      }
    }
  }
  .head {
    margin-top: 20px;
    border-top: 24px solid #f3f3f3;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .head-left {
      margin-left: 57px;
      /deep/ .van-tab {
        padding: 0 20px;
      }
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
    color: #999;
    font-size: 22px;
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
    .profiles-box {
      border-top: 1px solid #eee;
      .profiles {
        line-height: 48px;
        font-size: 26px;
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        .profiles-left {
          color: #666666;
        }
        .profiles-right {
          color: #333;
          padding-right:20px;
          overflow:hidden;
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        }
        .unfold {
          position: relative;
             p {
            margin: 0;
          }
          .p2-show {
            white-space: normal;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 3;
          }

          span {
            color: #1890ff;
            position: absolute;
            right: 0;
            bottom: 0;
            flex: 1;
            text-align: right;
            display: inline-block;
            padding-left: 30px;
            z-index: 1000;
            background: #fff;
          }
        }
        .link-box {
          color: #1890ff;
          display: flex;
          flex-direction: column;
          span{
            a{
               color: #1890ff;
            }
          }
          & > div:first-child {
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 30px;
          }
          & > div:nth-child(2) {
            span {
              margin-left: 5px;
            }
          }
          & > div:last-child {
            margin-top: 50px;
            span {
              margin-right: 30px;
            }
          }
        }
      }
    }
    .notic-box {
      border-top: 1px solid #eeeeee;
      .notic-item {
        border-bottom: 1px solid #eeeeee;
        padding-bottom:10px;
        .notic-top {
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 79px;
        }
        .notic-bottom {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #92959c;
          line-height: 34px;
        }
      }
    }
  }
}
</style>
