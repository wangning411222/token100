<!-- home -->
<template>
  <div class="about-container">
    <banner></banner>
    <search></search>
    <div class="tab-box">
      <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" sticky>
        <van-tab title="快讯">
          <div class="flash-box">
            <div class="date-box">
              <h3>今天 &nbsp{{ month }}月{{ day }}日 &nbsp{{ week }}</h3>
            </div>
            <div class="step-box">
              <van-steps direction="vertical" :active="0" active-icon="stop-circle" inactive-icon="stop-circle">
                <van-step>
                  <div class="step-item">
                    <div class="step-time">
                      <span>10:00</span>
                      <span>TOKEN数据</span>
                    </div>
                    <h3>平台币24H涨幅</h3>
                    <p>
                      据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有据数据显示，平台币24H涨幅靠前的币种有
                    </p>
                    <div class="btn-box">
                      <div class="btn">
                        <van-icon name="down"></van-icon>
                        <div>利好</div>
                        <div>0</div>
                      </div>
                      <div class="btn">
                        <van-icon style="transform: rotate(180deg)" name="down"></van-icon>
                        <div>利空</div>
                        <div>0</div>
                      </div>
                    </div>
                  </div>
                </van-step>
                <van-step>
                  <h3>【城市】物流状态2</h3>
                  <p>2016-07-11 10:00</p>
                </van-step>
                <van-step>
                  <h3>快件已发货</h3>
                  <p>2016-07-10 09:30</p>
                </van-step>
              </van-steps>
            </div>
          </div>
        </van-tab>
        <van-tab title="平台公告"></van-tab>
        <van-tab title="新闻"></van-tab>
        <van-tab title="活动"></van-tab>
        <van-tab title="小白教程"></van-tab>
        <van-tab title="日历"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import banner from '@/components/banner'
import search from '@/components/search'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      month: null,
      day: null,
      week: null
    }
  },
  components: { banner, search },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    this.month = this.$moment().format('M')
    this.day = this.$moment().format('D')
    this.week = this.$moment().format('dddd')
    console.log(this.$moment().format('dddd'), this.$moment().format('D'), this.$moment().format('M'))
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.about-container {
  /* 你的命名空间 */
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .tab-box {
    padding: 0px 19px 0 28px;
    .flash-box {
      border-top: 1px solid #d8d8d8;
      padding-left: 27px;
      .date-box {
        h3 {
          margin: 38px 0;
          color: #333;
          font-size: 28px;
        }
      }
      .step-box {
        /deep/.van-step__icon {
          color: #e4bc31;
        }
        /deep/.van-step--vertical{
          padding-bottom:40px;
          border-bottom:none;
        }
        .step-item {
          .btn-box {
            margin-top:31px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            .btn {
              padding: 5px 7px;
              font-size: 26px;
              color: #969c9f;
              border: 1px solid #d4d5d6;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
            }
          }
          & > .btn:last-child {
            margin-left: 68px;
          }
          .step-time {
            & > span:first-child {
              color: #333;
              font-size: 26px;
            }
            & > span:last-child {
              font-size: 26px;
              color: #9b9b9b;
              margin-left: 9px;
            }
          }
          h3{
            padding:26px 0;
            font-size:32px;
            color:#333;
            margin:0;
          }
          p{
            font-family: PingFangSC-Regular, PingFang SC;
            line-height:48px;
            margin:0;
            font-size:26px;
            color:#333;
          }
        }
      }
    }
  }
}
</style>
