<template>
  <div class="global-preview">
    <div class="preview-box">
      <div class="left">
        <div>
          <div class="label">总市值</div>
          <div class="value">¥16.89万亿</div>
        </div>
        <div>
          <div class="label">24H额</div>
          <div class="value">¥1.52万亿</div>
        </div>
      </div>
      <div class="right">
        <van-dropdown-menu direction="up" active-color="#676A6A">
          <van-dropdown-item ref="item">
            <van-cell>
              <div class="pop-content">
                <div class="content-item">
                  <div class="item-text">
                    <span>虚拟币</span>
                    <span>3457</span>
                  </div>
                  <div class="item-text">
                    <span>总市值¥</span>
                    <span>15.05万亿</span>
                  </div>
                </div>
                <div class="content-item">
                  <div class="item-text">
                    <span>代币</span>
                    <span>10106</span>
                  </div>
                  <div class="item-text">
                    <span>24H成交额¥</span>
                    <span>15.05万亿</span>
                  </div>
                </div>
                <div class="content-item">
                  <div class="item-text">
                    <span>交易平台</span>
                    <span>3457</span>
                  </div>
                  <div class="item-shape">
                    <div class="shape-left">
                      <span>上涨</span>
                      <span>2162</span>
                    </div>
                    <div class="shape-right">
                      <span>下跌</span>
                      <span>2201</span>
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
export default {
  data() {
    return {
      popShow: false
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.global-preview {
  background: #fff;
  z-index: 1000;
  width: calc(100% - 44px);
  height: 37px;
  padding: 14px 22px;
  line-height: 37px;
  position: fixed;
  bottom: 100px;

  .preview-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 26px;
      & > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .label {
          color: #969799;
          margin-right: 20px;
        }
        .value {
          color: #333;
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
