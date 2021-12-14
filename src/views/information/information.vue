
<template>
  <div class="about-container">
    <banner></banner>
    <search></search>
    <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31">
      <div class="tab-box">
        <van-tab title="快讯">
          <div class="flash-box">
            <div class="date-box">
              <h3>今天 &nbsp;{{ month }}月{{ day }}日 &nbsp; {{ week }}</h3>
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
                      <div class="btn" @click="bullishUp">
                        <van-icon name="down" style="transform: rotate(180deg)"></van-icon>
                        <div>利好</div>
                        <div>{{ bullishNum1 }}</div>
                      </div>
                      <div class="btn" @click="bullishDown">
                        <van-icon name="down"></van-icon>
                        <div>利空</div>
                        <div>{{ bullishNum2 }}</div>
                      </div>
                    </div>
                  </div>
                </van-step>
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
                  <h3>快件已发货</h3>
                  <p>2016-07-10 09:30</p>
                </van-step>
              </van-steps>
            </div>
          </div>
        </van-tab>
        <van-tab title="平台公告">
          <div class="notice-box">
            <van-list>
              <div class="box" v-for="(item, index) in noticeList" :key="index" @click="toRich">
                <div class="notice-left">
                  <van-image width="27px" height="25px" :src="item.url"></van-image>
                </div>
                <div class="notice-right">
                  <div class="notice-name">{{ item.title }}</div>
                  <div class="notice-time">{{ item.time }}</div>
                  <div class="notice-info">{{ item.info }}</div>
                </div>
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="新闻">
          <div class="news-box">
            <van-list>
              <div class="box" v-for="(item, index) in newsList" :key="index" @click="toRich">
                <newItem :author="item.author" :url="item.url" :time="item.time" :info="item.info"></newItem>
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="活动">
          <div class="news-box">
            <van-list>
              <div class="box" v-for="(item, index) in newsList" :key="index" @click="toRich">
                <newItem :author="item.author" :url="item.url" :time="item.time" :info="item.info"></newItem>
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="小白教程">
          <div class="news-box">
            <van-list>
              <div class="box" v-for="(item, index) in newsList" :key="index" @click="toRich">
                <newItem :author="item.author" :url="item.url" :time="item.time" :info="item.info"></newItem>
              </div>
            </van-list></div
        ></van-tab>
        <van-tab title="日历">
          <div class="calendar-box">
            <van-list>
              <div class="calendar-item" v-for="(item, index) in calendarList" :key="index">
                <div class="time">十二月24日 &nbsp; 星期五</div>
                <div class="title">
                  <van-image width="18px" height="18px" :src="item.url"></van-image>
                  <div class="name1">Stacks</div>
                  <div class="name2">STX</div>
                </div>
                <div class="star-box">
                  <van-rate v-model="item.star" allow-half void-icon="star" color="#FAD97E" void-color="#E8E8E8" />
                </div>
                <div class="info-box">
                  <span :class="item.status === 1 ? 'yello' : 'green'">
                    {{ item.status === 1 ? '产品发布' : '会议/AMA' }}
                  </span>
                  <span>
                    ALEX是比特币.上第一个通过StackALEX是比特币.上第一个通过StackALEX是比特币.上第一个通过StackALEX是比特币.上第一个通过StackALEX是比特币.上第一个通过Stack
                  </span>
                </div>
              </div>
            </van-list>
          </div>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import banner from '@/components/banner'
import search from '@/components/search'
import newItem from '@/components/newItem'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      month: null,
      day: null,
      week: null,
      bullishNum1: 0,
      bullishNum2: 0,
      noticeList: [
        {
          url: require('../../assets/image/Nem_logotype_overunder_lightbg_WEB@2x.png'),
          title: 'BitMart',
          time: '1小时前',
          info: '数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,'
        },
        {
          url: require('../../assets/image/Nem_logotype_overunder_lightbg_WEB@2x.png'),
          title: 'BitMart',
          time: '1小时前',
          info: '数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,'
        },
        {
          url: require('../../assets/image/Nem_logotype_overunder_lightbg_WEB@2x.png'),
          title: 'BitMart',
          time: '1小时前',
          info: '数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,'
        }
      ],
      newsList: [
        {
          url: require('../../assets/image/ChMkKWGhuiqILM4YAADhJ2YJs2EAAWBvgGNjaMAAOE_712@2x.png'),
          author: 'BitMart',
          time: '1小时前',
          info: '数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,'
        },
        {
          url: require('../../assets/image/ChMkKWGhuiqILM4YAADhJ2YJs2EAAWBvgGNjaMAAOE_712@2x.png'),
          author: 'BitMart',
          time: '1小时前',
          info: '数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,'
        },
        {
          url: require('../../assets/image/ChMkKWGhuiqILM4YAADhJ2YJs2EAAWBvgGNjaMAAOE_712@2x.png'),
          author: 'BitMart',
          time: '1小时前',
          info: '数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,'
        }
      ],
      calendarList: [
        {
          url: require('../../assets/image/Nem_logotype_overunder_lightbg_WEB@2x.png'),
          title: 'BitMart',
          time: '1小时前',
          info: '数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,',
          star: 1,
          status: 1
        },
        {
          url: require('../../assets/image/Nem_logotype_overunder_lightbg_WEB@2x.png'),
          title: 'BitMart',
          time: '1小时前',
          info: '数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,',
          star: 2,
          status: 2
        },
        {
          url: require('../../assets/image/Nem_logotype_overunder_lightbg_WEB@2x.png'),
          title: 'BitMart',
          time: '1小时前',
          info: '数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,数据显示，平台币24H涨幅靠前的币种有,',
          star: 3,
          status: 3
        }
      ]
    }
  },
  components: { banner, search, newItem },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {
    this.month = this.$moment().format('M')
    this.day = this.$moment().format('D')
    this.week = this.$moment().format('dddd')
    console.log(this.$moment().format('dddd'), this.$moment().format('D'), this.$moment().format('M'))
  },
  methods: {
    // 详情
    toRich() {
      this.$router.push({
        name: 'richHtml'
      })
    },
    // 点击利好
    bullishUp() {
      this.bullishNum1++
      if (this.bullishNum2 !== 0) {
        this.bullishNum2--
      }
    },
    // 点击利空
    bullishDown() {
      this.bullishNum2++
      if (this.bullishNum1 !== 0) {
        this.bullishNum1--
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.about-container {
  /* 你的命名空间 */
  background: #fff;
  display: flex;
  flex-direction: column;
  .tab-box {
    flex-grow: 1;
    .flash-box {
      border-top: 1px solid #d8d8d8;
      padding: 0 27px;
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
        /deep/.van-step--vertical {
          padding-bottom: 40px;
          border-bottom: none;
        }
        .step-item {
          .btn-box {
            margin-top: 31px;
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
            & > .btn:last-child {
              margin-left: 68px;
            }
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
          h3 {
            padding: 26px 0;
            font-size: 32px;
            color: #333;
            margin: 0;
          }
          p {
            font-family: PingFangSC-Regular, PingFang SC;
            line-height: 48px;
            margin: 0;
            font-size: 26px;
            color: #333;
          }
        }
      }
    }
    .notice-box {
      border-top: 1px solid #d8d8d8;
      padding: 0 42px;
      .box {
        padding-top: 28px;
        padding-bottom: 22px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        .notice-right {
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          .notice-name {
            color: #333;
            font-size: 30px;
            line-height: 42px;
            font-weight: 500;
          }
          .notice-time {
            margin-top: 6px;
            font-size: 26px;
            color: #9b9b9b;
            line-height: 37px;
          }
          .notice-info {
            margin-top: 10px;
            font-size: 26px;
            color: #333333;
            line-height: 48px;
          }
        }
      }
    }
    .news-box {
      border-top: 1px solid #d8d8d8;
    }
    .calendar-box {
      border-top: 1px solid #d8d8d8;
      .calendar-item {
        padding: 0 24px;
        border-bottom: 19px solid #f3f3f3;
        .time {
          margin-top: 19px;
          margin-bottom: 36px;
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 45px;
        }
        .title {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          .name1 {
            margin-left: 10px;
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 40px;
          }
          .name2 {
            margin-left: 9px;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #9b9b9b;
            line-height: 31px;
          }
        }
        .star-box {
          margin-top: 8px;
          margin-bottom: 28px;
        }
        .info-box {
          padding-bottom: 21px;
          span {
            line-height: 48px;
            font-size: 26px;
            color: #333;
          }
          & > span:first-child {
            display: inline-block;
            width: 119px;
            height: 38px;
            line-height: 38px;
            background-size: cover;
            background-position: center;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
            text-align: center;
          }

          .green {
            background-image: url('../../assets/image/矩形@2x(1).png');
          }
          .yello {
            background-image: url('../../assets/image/矩形@2x.png');
          }
          p {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
