<template>
  <div>
    <van-sticky>
      <van-nav-bar title="概念详情" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="concept">
      <div class="concept-head">
        <h3>{{dataObj.name}}</h3>
        <div class="num-box">
          <div class="concept-num">
            <div class="num-top">平均涨跌幅</div>
            <div class="font-big font-green">{{dataObj.change_percent}}%</div>
          </div>
          <div class="concept-num">
            <div class="num-top">上涨</div>
            <div class="num-bottom font-red">5</div>
          </div>
          <div class="concept-num">
            <div class="num-top">下跌</div>
            <div class="num-bottom font-green">6</div>
          </div>
          <div class="concept-num">
            <div class="num-top">币种总数</div>
            <div class="num-bottom">15</div>
          </div>
        </div>
        <div class="bar">
          <span class="rise"></span>
          <span class="text_rise">
            领涨AAVE
            <span class="textGreen">+15.48%</span></span
          >
          <span class="text_drop">
            <span class="textGreen">+0.98%</span>
            领跌SUSHI
          </span>
        </div>
      </div>
      <div class="line-gray"></div>
      <div class="concept-list">
        <div class="list-head">
          <h3>全球交易所行情</h3>
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
                      @click="selectRate( item.rateC)"
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
            <van-col span="4">币种</van-col>
            <van-col span="6">
              <div class="arrow-box">
                <div>市值 (¥)</div>
                <div class="img-box">
                  <van-image
                    style="transform: rotate(180deg); margin-bottom: 2px"
                    width="6px"
                    height="3px"
                    :src="require('../../assets/icon/上下箭头@2x(1).png')"
                  >
                  </van-image>
                  <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')">
                  </van-image>
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="arrow-box">
                <div>最新价 (¥)</div>
                <div class="img-box">
                  <van-image
                    style="transform: rotate(180deg); margin-bottom: 2px"
                    width="6px"
                    height="3px"
                    :src="require('../../assets/icon/上下箭头@2x(1).png')"
                  >
                  </van-image>
                  <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')">
                  </van-image>
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="arrow-box">
                <div>24小时涨幅</div>
                <div class="img-box">
                  <van-image
                    style="transform: rotate(180deg); margin-bottom: 2px"
                    width="6px"
                    height="3px"
                    :src="require('../../assets/icon/上下箭头@2x(1).png')"
                  >
                  </van-image>
                  <van-image width="6px" height="3px" :src="require('../../assets/icon/上下箭头@2x(1).png')">
                  </van-image>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <van-list>
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
  </div>
</template>
<script>
import { rateList } from '@/api/common'
export default {
  data() {
    return {
      rateArr: [], // 汇率数组
      rate: 'CNY',
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
      dataObj: null
    }
  },
  mounted() {
    // 获取汇率
    this.rateList()
    this.dataObj = this.$route.query.obj
    console.log(this.dataObj, '111111111111111111111')
  },
  methods: {
    // 选择汇率
    selectRate(value) {
      this.rate = value
      this.$refs.item.toggle()
    },
    // 获取汇率列表
    rateList() {
      rateList().then(res => {
        this.rateArr = res
      })
    },
    // 详情页
    toDetail() {
      this.$router.push({
        name: 'marketDetail'
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
        }
      }
    }
  }
}
</style>
