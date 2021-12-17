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
            <van-image
              @click="collect"
              v-if="isLogin"
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
              <div>NO.1</div>
            </div>
            <div>24H平台交易额</div>
            <div>¥ 1万亿</div>
          </div>
        </div>
      </div>
      <div class="head-center">
        <div class="center-left">
          <div>BTC</div>
          <div>比特币</div>
          <div>$6.95万亿</div>
        </div>
        <div class="center-right">-0.32%</div>
      </div>
      <div class="chart-select">
        <div class="chart-title">成交额走势</div>
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
          <div>成交额:${{ chartNum }}亿</div>
        </div>
        <div id="mychart"></div>
      </div>
    </div>
    <div class="head">
      <div class="head-left">
        <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31">
          <van-tab title="行情"> </van-tab>
          <van-tab title="简况"> </van-tab>
          <van-tab title="公告"> </van-tab>
        </van-tabs>
      </div>
      <div class="head-right">
        <van-dropdown-menu v-if="active===0">
          <van-dropdown-item :title="rate" v-model="rate" ref="item">
            <div class="rate-box">
              <van-row>
                <van-col
                  class="rate-item"
                  v-for="(item, index) in rateArr"
                  :key="index"
                  span="8"
                  @click="selectRate(item)"
                  >{{ item.name }}&nbsp;{{ item.value }}</van-col
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
        <van-col span="4">交易对</van-col>
        <van-col span="6">
          <div class="arrow-box">
            <div>平台价</div>
            <div class="img-box">
              <van-image
                style="transform: rotate(180deg); margin-bottom: 2px"
                width="6px"
                height="3px"
                :src="require('../../assets/icon/上下箭头@2x(1).png')"
              >
              </van-image>
              <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="arrow-box">
            <div>最新价</div>
            <div class="img-box">
              <van-image
                style="transform: rotate(180deg); margin-bottom: 2px"
                width="6px"
                height="3px"
                :src="require('../../assets/icon/上下箭头@2x(1).png')"
              >
              </van-image>
              <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="arrow-box">
            <div>占比</div>
            <div class="img-box">
              <van-image
                style="transform: rotate(180deg); margin-bottom: 2px"
                width="6px"
                height="3px"
                :src="require('../../assets/icon/上下箭头@2x(1).png')"
              >
              </van-image>
              <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')"> </van-image>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="list-box">
      <van-list v-if="active === 0">
        <van-row
          class="list-item"
          v-for="(item, index) in erList"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
          @click="toDetail"
        >
          <van-col span="2">
            <van-tag color="#E4BC31">{{ item.index }}</van-tag>
          </van-col>
          <van-col span="4" class="icon-name">
            <div class="icon-name-top">
              <van-image width="18px" height="18px" :src="item.src"></van-image>
              <span>{{ item.name }}</span>
            </div>
            <div class="bicon-name-bottom">Bitcoin</div>
          </van-col>
          <van-col span="6" style="text-align: right"> {{ item.money }}万亿 </van-col>
          <van-col span="6" style="text-align: right">
            <div>5</div>
          </van-col>
          <van-col span="6" style="text-align: right">
            <div>5</div>
          </van-col>
        </van-row>
      </van-list>
      <van-list v-if="active === 1">
        <div class="profiles-box">
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left">国家/地区</van-col>
            <van-col span="18" class="profiles-right">马耳他</van-col>
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left">交易支持</van-col>
            <van-col span="18" class="profiles-right">现货期货场外法币</van-col>
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left"> 交易对</van-col>
            <van-col span="18" class="profiles-right">1444个 </van-col>
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left"> 交易区</van-col>
            <van-col span="18" class="profiles-right">
              BTC, BUSD, USDT, BNB, ETH, USD, EUR, RUB, TRY, TUSD, USDC, BIDR, AUD, BRL, DAI, GBP, IDRT, UAH, NGN, TRX,
              XRP</van-col
            >
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left"> 简介</van-col>
            <van-col
class="profiles-right unfold"
span="18"
              ><p :class="unfoldTxt ? 'p2-show' : ''">
                币安(Binance)，国际领先的区块链数字 资产国际站，向全球提供广泛的数字货
                币交易、区块链教育、区币安(Binance)，国际领先的区块链数字 资产国际站，向全球提供广泛的数字货
                币交易、区块链教育、区币安(Binance)，国际领先的区块链数字 资产国际站，向全球提供广泛的数字货
                币交易、区块链教育、区币安(Binance)，国际领先的区块链数字 资产国际站，向全球提供广泛的数字货
                币交易、区块链教育、区
              </p>
              <span @click="unfoldClick">{{ unfoldTxt ? '展开' : '收起' }}</span>
            </van-col>
          </van-row>
          <van-row gutter="20" class="profiles">
            <van-col span="6" class="profiles-left">相关链接</van-col>
            <van-col span="18" class="profiles-right link-box">
              <div>https://accounts. binancezh.biz/zh-CN/register?ref=1862</div>
              <div>
                <span>备用地址1</span>
                <span>备用地址2</span>
                <span>备用地址3</span>
                <span>备用地址4</span>
              </div>
              <div>
                <span>Facebook</span>
                <span>Twitter</span>
                <span> 微博 </span>
              </div></van-col
            >
          </van-row>
        </div>
      </van-list>
      <van-list v-if="active === 2">
        <div class="notic-box">
          <div class="notic-item" v-for="(item, index) in noticList" :key="index" @click="toRich">
            <div class="notic-top">{{item.name}}</div>
            <div class="notic-bottom">{{item.time}}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      active: 0,
      isLogin: false,
      rate: 'CNY', // 选择的汇率
      rateArr: [
        {
          name: '人民币',
          value: 'CNY'
        },
        {
          name: '人币',
          value: 'BNY'
        },
        {
          name: '人民币',
          value: 'CNY'
        },
        {
          name: '人币',
          value: 'BNY'
        },
        {
          name: '人民币',
          value: 'CNY'
        },
        {
          name: '人币',
          value: 'BNY'
        },
        {
          name: '人民币',
          value: 'CNY'
        },
        {
          name: '人币',
          value: 'BNY'
        }
      ], // 汇率数组
      erList: [
        {
          index: 0,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 6
        },
        {
          index: 1,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 4
        },
        {
          index: 3,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 9
        },
        {
          index: 4,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 1
        },
        {
          index: 0,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 6
        },
        {
          index: 0,
          name: 'BTC',
          src: require('../../assets/image/比特币@2x.png'),
          money: 6.95,
          num: 6
        }
      ],
      result: [], // chart 数据
      chartTime: null, // 点击显示的时间
      chartNum: null, // 点击显示的金钱
      myChart: null,
      tipShow: false,
      chartActive: 0,
      timeArr: [
        {
          label: '所有',
          value: 0
        },
        {
          label: '24H',
          value: 1
        },
        {
          label: '1周',
          value: 2
        },
        {
          label: '3月',
          value: 3
        }
      ],
      unfoldTxt: true,
      noticList: [
        {
          name: '幣安.上市Render (RNDR)',
          time: '昨天 13:57'
        },
        {
          name: '幣安.上市Render (RNDR)',
          time: '昨天 13:57'
        },
        {
          name: '幣安.上市Render (RNDR)',
          time: '昨天 13:57'
        }
      ]// 公告列表
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    // 点击公告
    toRich() {
      this.$router.push({
        name: 'richHtml'
      })
    },
    // 点击展开
    unfoldClick() {
      this.unfoldTxt = !this.unfoldTxt
    },
    // 去详情页
    toDetail() {
      this.$router.push({
        name: 'platformDeatil'
      })
    },
    initChart() {
      const that = this
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById('mychart'))

      var option
      this.result = [
        [1638979200000, 85140300611.68],
        [1639065600000, 87263983461.96],
        [1639152000000, 66799780134.02],
        [1639238400000, 52974988423.97],
        [1639324800000, 86217667968.22],
        [1639411200000, 79687401227.36],
        [1639497600000, 99287346121.66]
      ]
      const xArr = this.result.map(item => {
        return that.$moment(item[0]).format('MM-DD,YYYY')
      })
      const yArr = this.result.map(item => {
        return item[1]
      })
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
          left: '0', // 与容器左侧的距离
          right: '0', // 与容器右侧的距离
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
            interval: 1
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
                return Math.round(value / 100000000) + '亿'
              } else if (value >= 10000) {
                return Math.round(value / 10000) + '万'
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
      const time = this.result[clickIndex][0]
      this.chartTime = this.$moment(time).format('YYYY-MM-DD')
      this.chartNum = (this.result[clickIndex][1] / 100000000).toFixed(2)
      this.tipShow = true
    },
    // 点击小星星
    collect() {
      if (this.isLogin) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast('请先登录')
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
      border-top: 19px solid #f3f3f3;
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
