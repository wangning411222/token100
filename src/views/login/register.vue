
<template>
<!-- 注册 -->
  <div class="page">
    <van-sticky>
      <van-nav-bar :title="$t('mine.register')" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="page-content">
      <van-form>
        <div class="phone">
          <span>+{{selectCOde}}</span>
            <van-dropdown-menu>
            <van-dropdown-item ref="item">
              <div v-for="(item, index) in countryCode" :key="index" class="code-box"   @click="selectCode(item)">
                <div class="code-left"> {{ item.countryPhoneCode }}</div>
                <div class="code-right"> {{ item.countryName }}</div>

              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
          <van-field
            v-model="username"
            :name="$t('mine.username')"
            :placeholder="$t('mine.phoneplaceholder')"

          />
        </div>
        <div class="password">
          <van-field
            v-model="password"
            :placeholder="$t('mine.codeplaceholder')"

            ><template #button>
              <!-- <span>发送验证码</span> -->
              <van-button color="#e4bc31" v-show="sedShow" :disabled="!codeDisable" @click="smsSend">{{$t('mine.sendcode')}}</van-button>
              <van-button color="#e4bc31" v-show="!sedShow" >{{count}}</van-button>
            </template></van-field
          >
        </div>

        <div class="button-box" @click="next">
          <van-button round block color="#e4bc31" :disabled="!btnDisable" native-type="submit">{{$t('mine.next')}}</van-button>
        </div>
      </van-form>
      <div class="bottom-t">
       <van-checkbox v-model="checked"></van-checkbox>
        <span>{{$t('mine.iagree')}}<router-link :to="{ name: 'userAgreement' }">TOKREN{{$t('mine.useragreement')}}</router-link></span>
      </div>
    </div>
  </div>
</template>
<script>
import { getCountry, smsSend } from '@/api/mine'
export default {
  data() {
    return {
      username: '',
      password: '',
      showPsd: false,
      checked: false,
      countryCode: [],
      selectCOde: '86',
      sedShow: true,
      count: '',
      timer: null,
      rescode: null

    }
  },
  mounted() {
    this.getCountry()
  },
  computed: {
    btnDisable() {
      if (this.selectCOde !== '86') {
        if (this.username && this.password && this.checked) {
          return true
        } else {
          return false
        }
      } else {
        var reg = /^1[345678]\d{9}$/
        if (reg.test(this.username) && this.password && this.checked) {
          return true
        } else {
          return false
        }
      }
    },
    // 是否可以发送验证码
    codeDisable() {
      if (this.selectCOde !== '86' && this.username) {
        return true
      } else {
        var reg = /^1[345678]\d{9}$/
        if (reg.test(this.username)) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    getCode() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.sedShow = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.sedShow = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 发送验证码
    smsSend() {
      this.getCode()
      const data = {
        phone: this.username,
        code: this.selectCOde
      }
      smsSend(data).then(res => {
        this.rescode = res
      })
    },
    // 下一步
    next() {
      if (this.btnDisable) {
        if (this.password.trim() === this.rescode) {
          this.$router.push({
            path: '/setPassword',
            query: {
              code: this.selectCOde,
              phone: this.username,
              smsCode: this.rescode
            }
          })
        } else {
          this.$notify(this.$t('mine.wrongcode'))
        }
      }
    },
    // 选择区号
    selectCode(item) {
      this.username = ''
      this.selectCOde = item.countryPhoneCode
      this.$refs.item.toggle()
    },
    // 获取国家区号
    getCountry() {
      getCountry().then(res => {
        this.countryCode = res
      })
    },
    // 返回
    onClickLeft() {
      this.$router.push({
        name: 'Mine'
      })
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
    .van-nav-bar__left {
      .van-icon-arrow-left {
        color: #666666;
      }
    }
  }

  .page-content {
    /deep/ .van-dropdown-menu {
      width: 50px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
    }
    /deep/ .van-dropdown-menu__item {
      border: none;
      justify-content: flex-end !important;
    }
    /deep/ .van-dropdown-menu__title{
      color: #909090;
    }
    /deep/ .van-dropdown-menu__bar {
      box-shadow: none;
    }
    margin: 64px 32px 0 29px;
    .phone {
      border-bottom: 1px solid #eeeeee;
      @include flexbox;
      .code-box{
        margin:0 30px;
        padding:30px 60px;
        border-bottom:1px solid rgb(204, 204, 204);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color:#858585;
      }
      span {
        font-size: 28px;
        color: #333333;
      }
    }
    .password {
      border-bottom: 1px solid #eeeeee;
      @include flexbox;

      .van-image {
        width: 38px;
        height: 29px;
      }
    }
    .button-box {
      margin-top: 154px;
      .van-botton {
        background: #ccc;
      }
    }
    .bottom-t {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-top: 44px;
      /deep/ .van-icon{
        color:#fff;
      }
      span {
          font-size:28px;
          color:#999;
        margin-left: 10px;
        a {
          color: #0d8dfb;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
