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
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      isLogin: false
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      console.log(this.$echarts, 'aaaaaaaaaaaaaaaaaaaaaaaaa')
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('mychart'))
      var option

      const dataCount = 2e5
      const data = generateOHLC(dataCount)
      option = {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        legend: {
          top: 'middle'
          // orient: 'vertical'
        },
        grid: {
          x: 0,
          y: 0,
          y2: 0,
          x2: 0
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          scale: true,
          position: 'right',
          type: 'value',
          axisLable: {
            formatter: '{value}亿'
          },
          boundaryGap: [0, '100%'],
          min: 'dataMin'
        },
        series: [
          {
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: data
          }
        ]
      }
      function generateOHLC(count) {
        const data = []
        let xValue = +new Date(2011, 0, 1)
        const minute = 60 * 1000
        let baseValue = Math.random() * 12000
        const boxVals = new Array(4)
        const dayRange = 12
        for (let i = 0; i < count; i++) {
          baseValue = baseValue + Math.random() * 20 - 10
          for (let j = 0; j < 4; j++) {
            boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue
          }
          boxVals.sort()
          const openIdx = Math.round(Math.random() * 3)
          let closeIdx = Math.round(Math.random() * 2)
          if (closeIdx === openIdx) {
            closeIdx++
          }
          const volumn = boxVals[3] * (1000 + Math.random() * 500)
          // ['open', 'close', 'lowest', 'highest', 'volumn']
          // [1, 4, 3, 2]
          data[i] = [
            echarts.time.format('yyyy-MM-dd\nhh:mm:ss', (xValue += minute)),
            +boxVals[openIdx].toFixed(2),
            +boxVals[3].toFixed(2),
            +boxVals[0].toFixed(2),
            +boxVals[closeIdx].toFixed(2),
            +volumn.toFixed(0),
            getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
          ]
        }
        return data
        function getSign(data, dataIndex, openVal, closeVal, closeDimIdx) {
          var sign
          if (openVal > closeVal) {
            sign = -1
          } else if (openVal < closeVal) {
            sign = 1
          } else {
            sign =
        dataIndex > 0
          ? // If close === open, compare with close of last record
          data[dataIndex - 1][closeDimIdx] <= closeVal
            ? 1
            : -1
          : // No record of previous, set to be positive
          1
          }
          return sign
        }
      }

      option && myChart.setOption(option)
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
    #mychart{
      width:725px;
      height:304px;
    }
  }
}
</style>
