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
            <van-dropdown-item title="CNY" v-model="value1" >
              <van-cell>
               <div>
                 <div></div>
                 <div></div>
                 <div></div>
               </div>
              </van-cell>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
      </div>
    </van-sticky>
  </div>
</template>

<script>
import banner from '@/components/banner'
import search from '@/components/search'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 1,
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
    }
  },
  components: { banner, search },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.about-container {
  .head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .head-right{
      height:100%;
   
      /deep/ .van-dropdown-menu__bar{
        box-shadow: none;
        margin-right:20px;
      }
      /deep/ .van-dropdown-menu__title{
        color:#909090;
      }
    }
  }
}
</style>
