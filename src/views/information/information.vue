<template>
  <div class="about-container">
    <banner></banner>
    <van-sticky>
      <search></search>
      <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" @click="tabsClick">
        <van-tab :title="$t('information.newflash')"> </van-tab>
        <van-tab :title="$t('information.Platformannouncement')"> </van-tab>
        <van-tab :title="$t('information.news')"> </van-tab>
        <van-tab :title="$t('information.activity')"> </van-tab>
        <van-tab :title="$t('information.tutorial')"> </van-tab>
        <van-tab :title="$t('information.calendar')"> </van-tab>
      </van-tabs>
    </van-sticky>
    <div class="tab-box">
       <van-loading
        v-show="loading"
        style="width: 100%; height: 100%; position: absolute; top: 200px; text-align: center"
        color="rgb(228, 188, 49)"
      />
      <div class="flash-box" v-if="active === 0">
        <div class="date-box">
          <h3>{{$t('market.today')}} &nbsp;{{ month }}{{$t('information.month')}}{{ day }}{{$t('information.day')}} &nbsp; {{ week }}</h3>
        </div>
        <div class="step-box">
          <van-steps direction="vertical" :active="0" active-icon="stop-circle" inactive-icon="stop-circle">
            <van-step v-for="(item,index) in stepList" :key="index">
              <div class="step-item"  @click="toRich(item.newsId)">
                <div class="step-time">
                  <span>{{$moment(item.newsDateTime).format('hh:mm')}}</span>
                  <span>{{item.newsSourceName}}</span>
                </div>
                <h3>{{item.newsTitle}}</h3>
                <p>
                {{item.newsContent}}
                </p>
                <div class="btn-box">
                  <div class="btn" @click="bullishUp">
                    <van-icon name="down" style="transform: rotate(180deg)"></van-icon>
                    <div>{{$t('information.bull')}}</div>
                    <div>{{ bullishNum1 }}</div>
                  </div>
                  <div class="btn" @click="bullishDown">
                    <van-icon name="down"></van-icon>
                    <div>{{$t('information.bear')}}</div>
                    <div>{{ bullishNum2 }}</div>
                  </div>
                </div>
              </div>
            </van-step>
          </van-steps>
        </div>
      </div>
      <div class="notice-box" v-if="active === 1">
        <van-list>
          <div class="box" v-for="(item, index) in stepList" :key="index" @click="toRich(item.newsId)">
            <div class="notice-left">
              <van-image width="27px" height="25px" :src="item.newsSourceLogo"></van-image>
            </div>
            <div class="notice-right">
              <div class="notice-name">{{ item.newsTitle }}</div>
              <div class="notice-time">{{ $moment().startOf('hour').fromNow() }}</div>
              <div class="notice-info">{{ item.newsContent }}</div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="news-box" v-if="active === 2">
        <van-list>
          <div class="box" v-for="(item, index) in stepList" :key="index" @click="toRich(item.newsId)">
            <newItem :author="item.newsSourceName" :url="item.newsSourceImages" :time="$moment().startOf('hour').fromNow()" :info="item.newsTitle"></newItem>
          </div>
        </van-list>
      </div>
      <div class="news-box" v-if="active === 3">
        <van-list>
          <div class="box" v-for="(item, index) in stepList" :key="index" @click="toRich(item.newsId)">
            <newItem :author="item.newsSourceName" :url="item.newsSourceLogo" :time="$moment(item.createTime).format('YYYY-MM-DD hh:mm')" :info="item.newsTitle"></newItem>
          </div>
        </van-list>
      </div>
      <div class="news-box" v-if="active === 4">
        <van-list>
          <div class="box" v-for="(item, index) in stepList" :key="index" @click="toRich(item.newsId)">
            <newItem :author="item.newsSourceName" :url="item.newsSourceLogo" :time="$moment(item.createTime).format('YYYY-MM-DD hh:mm')" :info="item.newsTitle"></newItem>
          </div>
        </van-list>
      </div>
      <div class="calendar-box" v-if="active === 5">
        <van-list>
          <div class="calendar-item" v-for="(item, index) in stepList" :key="index" @click="toRich(item.newsId)">
            <div class="time">{{$moment(item.newsDateTime).format('MM-DD')}} &nbsp;&nbsp; {{$moment(item.newsDateTime).format('dddd')}}</div>
            <div class="title">
              <van-image width="18px" height="18px" :src="item.newsSourceLogo"></van-image>
              <div class="name1">{{item.newsTitle }}</div>
              <div class="name2">{{item.newsSourceName}}</div>
            </div>
            <div class="star-box">
              <van-rate :count="3" v-model="item.newsStar" allow-half void-icon="star" color="#FAD97E" void-color="#E8E8E8" />
            </div>
            <div class="info-box">
              <span :style="{background:newsTypeFiltercolor(item.newsType)}">
                {{ newsTypeFilter(item.newsType) }}
              </span>
              <span>
              {{item.newsContent}}
              </span>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { newsList } from '@/api/information'
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

      stepList: [],
      loading: false
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
    this.getNewsList()
  },
  methods: {
    newsTypeFilter(value) {
      switch (value) {
        case 1:
          return this.$t('information.Onthecurrency')
        case 2:
          return this.$t('information.Flowmining')
        case 3:
          return this.$t('information.NFTauction')
        case 4:
          return this.$t('information.AnnouncementsNews')
        case 5:
          return this.$t('information.productrelease')
        case 6:
          return this.$t('information.Airdropreward')
        case 7:
          return this.$t('information.Forkswap')
        case 8:
          return this.$t('information.Tokendestructionrepurchase')
        case 9:
          return this.$t('information.meetingAMA')
        case 10:
          return this.$t('information.rests')
      }
    },
    newsTypeFiltercolor(value) {
      switch (value) {
        case 1:
          return '#F44336'
        case 2:
          return '#673AB7'
        case 3:
          return '#03A9F4'
        case 4:
          return '#4CAF50'
        case 5:
          return '#FFEB3B'
        case 6:
          return '#FF5722'
        case 7:
          return '#607D8B'
        case 8:
          return '#9C27B0'
        case 9:
          return '#AMA009688'
        case 10:
          return '#795548'
      }
    },
    // 获取新闻列表
    tabsClick(value) {
      this.getNewsList()
    },
    getNewsList() {
      this.loading = true
      this.stepList = []
      const data = {
        newsClassify: this.active + 1,
        current: 1,
        size: 20
      }
      newsList(data).then(res => {
        this.stepList = res.records
        this.loading = false
      })
    },
    // 详情
    toRich(id) {
      this.$router.push({
        path: '/detail',
        query: { id }
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
    position: relative;
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
            border-top-left-radius:100px;
             border-bottom-right-radius:100px;
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
