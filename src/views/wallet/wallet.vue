<!-- home -->
<template>
  <div class="about-container">
    <banner></banner>
    <search></search>
    <div class="tab-box">
      <van-tabs v-model="active" color="#E4BC31" title-active-color="#E4BC31" sticky>
        <van-tab title="所有"> </van-tab>
        <van-tab title="APP钱包">内容 2</van-tab>
        <van-tab title="PC钱包">内容 3</van-tab>
        <van-tab title="硬件钱包">内容 4</van-tab>
        <van-tab title="BTC">内容 4</van-tab>
      </van-tabs>
    </div>
    <div class="list-box">
      <tabHead @safety="safety" @start="start"></tabHead>
      <van-list>
        <van-cell v-for="(item, index) in list" :key="item">
          <div class="item-left">
            <van-tag color="#E4BC31">{{ index + 1 }}</van-tag>
            <div class="info-box">
              <van-image :src="item.imgurl" />
              <div class="info">
                <div class="info-txt">BTC</div>
                <div class="info-img">
                  <van-image :src="item.phoneImg" />
                  <van-image :src="item.chipImg" />
                </div>
              </div>
            </div>
          </div>
          <div class="item-right">
            <van-rate v-model="item.value" :size="18" gutter="3px" color="#FAD97E" void-icon="star" void-color="#eee" />
            <div class="right-txt">安全性:中等</div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import banner from '@/components/banner'
import search from '@/components/search'
import tabHead from '@/components/tabHead'
// 请求接口
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      list: [
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        },
        {
          imgurl: require('../../assets/image/比特币@2x.png'),
          phoneImg: require('../../assets/image/手机@2x.png'),
          chipImg: require('../../assets/image/芯片@2x.png'),
          value: 2.5
        }
      ]
    }
  },
  components: { banner, search, tabHead },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {},
  methods: {
    // 点击安全性排序
    safety(value) {
      // true正序 false反序
      console.log(value, '安全性')
    },
    // 点击星级排序
    start(value) {
      console.log(value, '星级')
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', '真乖，赶紧关注公众号，组织都在等你~')
    },
    goGithub(index) {
      window.location.href = 'https://github.com/sunniejs/vue-h5-template'
    }
  }
}
</script>
<style lang="scss">
.about-container {
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .tab-box {
    padding: 31px 19px 0 28px;
  }
  .list-box {
    border-top: 1px solid #d8d8d8;
    padding: 0 19px 0 28px;
    .van-cell {
      padding: 24px 0;
      border-bottom:1px solid #eee;
      .van-cell__value {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .item-left {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          .info-box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .van-image {
              margin-left: 18px;
              width: 83px;
              height: 83px;
            }
            .info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 19px;
              .info-txt {
                font-size: 28px;
                color: #333;
                font-weight: 500;
                text-align: left;
              }
              .info-img {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                .van-image {
                  margin: 0;
                  width: 35px;
                  height: 35px;
                }
              }
            }
          }
        }
        .item-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .right-txt{
            margin-top:20px;
            font-size:28px;
            color:#92959C;
            text-align:right;
          }
        }
      }
    }
  }
}
</style>
