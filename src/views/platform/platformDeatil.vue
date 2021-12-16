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
      <div class="chart-box">
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
        <van-dropdown-menu>
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
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    // 去详情页
    toDetail() {
      this.$router.push({
        name: 'platformDeatil'
      })
    },
    initChart() {
      const that = this
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('mychart'))

      var option
      const result = [
        [1638979200000, 85140300611.68],
        [1639065600000, 87263983461.96],
        [1639152000000, 66799780134.02],
        [1639238400000, 52974988423.97],
        [1639324800000, 86217667968.22],
        [1639411200000, 79687401227.36],
        [1639497600000, 99287346121.66]
      ]
      const xArr = result.map(item => {
        return that.$moment(item[0]).format('MM-DD,YYYY')
      })
      const yArr = result.map(item => {
        return item[1]
      })
      option = {
        // 提示框
        // tooltip: {
        //   trigger: 'axis',
        //   position: function(pt) {
        //     return [pt[0], '10%']
        //   }
        // },
        grid: {
          left: '0', // 与容器左侧的距离
          right: '5%', // 与容器右侧的距离
          top: '5%', // 与容器顶部的距离
          bottom: '0', // 与容器底部的距离
          borderWidth: 10,
          containLabel: true
        },
        xAxis: {
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
            symbol: 'none',
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
      option && myChart.setOption(option)
      console.log(myChart, 'myChartmyChartmyChart')
      myChart.on('click', function(params) {
        // 控制台打印数据的名称
        console.log(params)
      })
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
    .chart-box {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100vw;
      overflow-x: hidden;
      #mychart {
        width: 100%;
        height: 304px;
      }
    }
  }
  .head {
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
        align-items: center;
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
  }
}
</style>
