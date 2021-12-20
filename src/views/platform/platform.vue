<template>
  <div class="about-container">
    <banner></banner>
    <van-sticky>
      <search></search>
      <div class="head">
        <div class="head-left">
          <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31">
            <van-tab title="ER全球交易所排行 "> </van-tab>
            <van-tab title="持有资产排行"> </van-tab>
            <van-tab title="合约平台"> </van-tab>
            <van-tab title="OTC"> </van-tab>
            <van-tab title="活跃平台"> </van-tab>
            <van-tab title="关注"> </van-tab>
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
                   @click="selectRate( item.rateC)"
                    >{{ item.rateName }}&nbsp;{{ item.rateC }}</van-col
                  >
                </van-row>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
      </div>
      <!-- ER全球交易排行榜 -->
      <div class="table-head" v-if="active === 0 ">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">交易所</van-col>
          <van-col span="8">
            <div class="arrow-box">
              <div>24H额(¥)</div>
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
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
      <!-- 持有资产 -->
      <div class="table-head" v-if="active === 1">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">交易所</van-col>
          <van-col span="8">
            <div class="arrow-box">
              <div>持有资产(฿)</div>
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
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
      <!-- 合约平台 -->
      <div class="table-head" v-if="active === 2">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="8">ER排名/交易平台</van-col>
          <van-col span="8" style="text-align: right"> 合约交易数量 </van-col>
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
      <!-- OTC -->
      <div class="table-head" v-if="active === 3">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="8">ER排名/交易平台</van-col>
          <van-col span="8">
            <div class="arrow-box">
              <div>24H额(¥)</div>
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
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
      <!-- 活跃平台 -->
      <div class="table-head" v-if="active === 4">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">交易所</van-col>
          <van-col span="8">
            <div class="arrow-box">
              <div>24H额(¥)</div>
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
          <van-col span="8" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
       <div class="table-head" v-if="active === 5 && isLogin">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="2">#</van-col>
          <van-col span="6">交易所</van-col>
          <van-col span="6">
            <div class="arrow-box">
              <div>24H额(¥)</div>
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
          <van-col span="10" style="text-align: right">
            <van-image width="55px" height="20px" :src="require('../../assets/image/位图@2x.png')"> </van-image>
          </van-col>
        </van-row>
      </div>
    </van-sticky>
    <div class="list-box">
      <!-- ER全球交易排行榜 -->
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
          <van-col span="6" class="icon-name">
            <van-image width="18px" height="18px" :src="item.src"></van-image>
            <span>{{ item.name }}</span>
          </van-col>
          <van-col span="8" style="text-align: right"> {{ item.money }}万亿 </van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.num"></myprogress>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 持有资产 -->
      <van-list v-if="active === 1">
        <van-row
          class="list-item"
          v-for="(item, index) in erList"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
        >
          <van-col span="2">
            <van-tag color="#E4BC31">{{ item.index }}</van-tag>
          </van-col>
          <van-col span="6" class="icon-name">
            <van-image width="18px" height="18px" :src="item.src"></van-image>
            <span>{{ item.name }}</span>
          </van-col>
          <van-col span="8" style="text-align: right"> {{ item.money }}万亿 </van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.num"></myprogress>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 合约平台 -->
      <van-list v-if="active === 2">
        <van-row
          class="list-item"
          v-for="(item, index) in erList"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
        >
          <van-col span="8" class="heyue-box">
            <van-tag color="#E4BC31">{{ item.index }}</van-tag>
            <div class="icon-name margin-left">
              <van-image width="18px" height="18px" :src="item.src"></van-image>
              <span>{{ item.name }}</span>
            </div>
          </van-col>
          <van-col span="8" style="text-align: right"> {{ item.money }}万亿 </van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.num"></myprogress>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <!-- OCT -->
      <van-list v-if="active === 3">
        <van-row
          class="list-item"
          v-for="(item, index) in erList"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
        >
          <van-col span="8" class="heyue-box">
            <van-tag color="#E4BC31">{{ item.index }}</van-tag>
            <div class="icon-name margin-left">
              <van-image width="18px" height="18px" :src="item.src"></van-image>
              <span>{{ item.name }}</span>
            </div>
          </van-col>
          <van-col span="8" style="text-align: right"> {{ item.money }}万亿 </van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.num"></myprogress>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 活跃平台 -->
      <van-list v-if="active === 4">
        <van-row
          class="list-item"
          v-for="(item, index) in erList"
          :key="index"
          type="flex"
          justify="space-between"
          cente="center"
        >
          <van-col span="2">
            <van-tag color="#E4BC31">{{ item.index }}</van-tag>
          </van-col>
          <van-col span="6" class="icon-name">
            <van-image width="18px" height="18px" :src="item.src"></van-image>
            <span>{{ item.name }}</span>
          </van-col>
          <van-col span="8" style="text-align: right"> {{ item.money }}万亿 </van-col>
          <van-col span="8" style="text-align: right">
            <div>
              <myprogress :num="item.num"></myprogress>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <!-- 关注 -->
      <div v-if="active === 5">
        <div class="login-box" v-if="!isLogin">
          <van-image width="140px" height="169px" :src="require('../../assets/image/空@2x.png')"></van-image>
          <span>登陆查看更多</span>
          <van-button color="#E4BC31" @click="linkToLogin">立即登陆</van-button>
        </div>
        <div v-else>
          <van-list>
            <van-row
              class="list-item"
              v-for="(item, index) in erList"
              :key="index"
              type="flex"
              justify="space-between"
              cente="center"
            >
              <van-col span="2">
                <van-tag color="#E4BC31">{{ item.index }}</van-tag>
              </van-col>
              <van-col span="6" class="icon-name">
                <van-image width="18px" height="18px" :src="item.src"></van-image>
                <span>{{ item.name }}</span>
              </van-col>
              <van-col span="6" style="text-align: right"> {{ item.money }}万亿 </van-col>
              <van-col span="10" >
                <div class="guanzhu-start">
                  <myprogress :num="item.num"></myprogress>
                  <van-image @click="starClick" width="15px" height="14px" :src="require('../../assets/image/星星2@2x.png')"></van-image>
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
import { rateList } from '@/api/common'
import banner from '@/components/banner'
import search from '@/components/search'
import myprogress from '@/components/myprogress'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      rate: 'CNY', // 选择的汇率
      rateArr: [], // 汇率数组
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
  // eslint-disable-next-line vue/no-unused-components
  components: { banner, search, myprogress },
  computed: {
    ...mapGetters(['userName', 'isLogin'])
  },
  mounted() {
    // 获取汇率
    this.rateList()
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
        console.log(res, 'res````````````````````````')
        this.rateArr = res
      })
    },
    // 去登陆页
    linkToLogin() {
      this.$router.push({
        name: 'Login'
      })
    },
    // 去详情页
    toDetail() {
      this.$router.push({
        name: 'platformDeatil'
      })
    },
    // 关注列表点击星星
    starClick() {
      this.$toast('已取消关注')
    }
  }
}
</script>
<style lang="scss" scoped>
.about-container {
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
      }
    }
  }
  .list-box {
    padding: 0 28px;
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
      .guanzhu-start{
        display: flex;
        flex-basis: row;
        justify-content: flex-end;
        align-items: center;
        .van-image{
          margin-left:36px;
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
