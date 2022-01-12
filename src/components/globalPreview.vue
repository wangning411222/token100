<template>
  <div class="global-preview">
    <div class="preview-box">
      <div class="left">
        <div>
          <div class="label">{{ $t('global.totalvalue') }}</div>
          <div class="value">{{ rateCode }}{{ marketVolume }}</div>
        </div>
        <div>
          <div class="label">{{ $t('market.forehead24h') }}</div>
          <div class="value">{{ rateCode }}{{ dayVolume }}</div>
        </div>
      </div>
      <div class="right">
        <van-dropdown-menu direction="up" active-color="#676A6A">
          <van-dropdown-item ref="item">
            <van-cell>
              <div class="pop-content">
                <div class="content-item">
                  <div class="item-text">
                    <span>{{ $t('global.virtualcurrency') }}</span>
                    <span>{{ codeTotal }}</span>
                  </div>
                  <div class="item-text">
                    <span>{{ $t('global.totalvalue') }}{{ rateCode }}</span>
                    <span>{{ marketVolume }}</span>
                  </div>
                </div>
                <div class="content-item">
                  <div class="item-text">
                    <span>{{ $t('global.token') }}</span>
                    <span>{{ tokenTotal }}</span>
                  </div>
                  <div class="item-text">
                    <span>24H{{ $t('plantform.volumetransaction') }}{{ rateCode }}</span>
                    <span>{{ dayVolume }}</span>
                  </div>
                </div>
                <div class="content-item">
                  <div class="item-text">
                    <span>{{ $t('plantform.tradingplatform') }}</span>
                    <span>{{ marketTotal }}</span>
                  </div>
                  <div class="item-shape">
                    <div class="shape-left">
                      <span>{{ $t('market.goup') }}</span>
                      <span>{{ riseNum }}</span>
                    </div>
                    <div class="shape-right">
                      <span>{{ $t('market.godown') }}</span>
                      <span>{{ fallNum }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@/filters/mixin'
import { total } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      popShow: false,
      codeTotal: 0,
      dayVolume: 0,
      fallNum: 0,
      marketTotal: 0,
      marketVolume: 0,
      riseNum: 0,
      tokenTotal: 0,
      rateR: null,
      rateCode: null
    }
  },
  mixins: [mixin],
  computed: {
    ...mapGetters(['userName', 'isLogin', 'globalRate', 'languageId', 'globalRateArr'])
  },
  mounted() {
    if (this.globalRateArr.length) {
      this.fn()
    }
  },
  watch: {
    globalRateArr: {
      handler(val) {
        val.length && this.fn()
      },
      deep: true
    }
  },
  methods: {
    fn() {
      this.rateR = this.globalRate // 全局汇率,初始化赋值
      this.rate = this.languageId // CNY
      const obj = this.globalRateArr.filter(item => {
        return item.rateC === this.rate
      })
      this.rateCode = obj[0].rateCode
    },
    total() {
      total().then(res => {
        const { codeTotal, dayVolume, fallNum, marketTotal, marketVolume, riseNum, tokenTotal } = res
        this.codeTotal = codeTotal
        this.dayVolume = this.enNumUnti(dayVolume * this.rateR)
        this.fallNum = fallNum
        this.marketTotal = marketTotal
        this.marketVolume = this.enNumUnti(marketVolume * this.rateR)
        this.riseNum = riseNum
        this.tokenTotal = tokenTotal
      })
    }
  },
  created() {
    this.total()
  }
}
</script>
<style lang="scss" scoped>
.global-preview {
  background: #fff;
  z-index: 1000;
  width: calc(100% - 44px);
  height: 65px;
  line-height: 65px;
  border-top:1px solid #D8D8D8;
  padding: 14px 22px;
  position: fixed;
  bottom: 100px;
  box-sizing: content-box;

  .preview-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .left {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 26px;
       white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
      & > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size:26px;
        .label {
          color: #969799;
          margin-right: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .value {
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      & > div:first-child {
        margin-right: 30px;
      }
    }
    .right {
      flex-grow: 1;
      padding-right: 10px;
      .van-dropdown-menu {
        height: 37px;
        /deep/.van-dropdown-menu__bar {
          box-shadow: none;
          height: 100%;
        }
        /deep/ .van-dropdown-menu__item {
          border: none;
          justify-content: flex-end !important;
        }
      }
      .pop-content {
        padding: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        .content-item {
          display: flex;
          flex-direction: column;
          .item-text {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            align-items: center;
            & > span:first-child {
              color: #939ea9;
            }
          }
          .item-shape {
            color: #fff;
            display: flex;
            flex-direction: row;

            .shape-left,
            .shape-right {
              padding: 5px 15px;
              display: flex;
              flex-direction: column;
            }
            .shape-left {
              background: #0ab45a;
            }
            .shape-right {
              background: #ff6059;
            }
          }
        }
      }
    }
  }
}
</style>
