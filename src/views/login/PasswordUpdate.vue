<template>
<!-- 忘记密码设置密码 -->
  <div class="page">
    <van-sticky>
      <van-nav-bar title="设置新密码" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="page-content">
      <van-form >
        <div class="password">
          <van-field
            v-model="password1"
            :type="showPsd1 ? 'text' : 'password'"
            placeholder="请输入您密码"
          />
          <van-image
            @click="showPassword1"
            :src="showPsd1 ? require('../../assets/icon/showpsd.png') : require('../../assets/icon/hiddenpsd.png')"
          />
        </div>
        <div class="password">
          <van-field
            v-model="password2"
            :type="showPsd2 ? 'text' : 'password'"
            placeholder="再次输入您的密码"
          />
          <van-image
            @click="showPassword2"
            :src="showPsd2 ? require('../../assets/icon/showpsd.png') : require('../../assets/icon/hiddenpsd.png')"
          />
        </div>

        <div class="button-box"  @click="onSubmit">
          <van-button round block color="#E4BC31"  :disabled="!submitDisable" native-type="submit">确定</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { userPasswordUpdate } from '@/api/mine'
export default {
  data() {
    return {
      password1: '',
      password2: '',
      showPsd1: false,
      showPsd2: false,
      code: null,
      phone: null,
      smsCode: null

    }
  },
  computed: {
    submitDisable() {
      if (this.password1 && this.password2) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 密码显示于隐藏
    showPassword1() {
      this.showPsd1 = !this.showPsd1
    },
    showPassword2() {
      this.showPsd2 = !this.showPsd2
    },
    onSubmit(values) {
      if (this.password1 === this.password2) {
        const data = {
          smsCode: this.smsCode,
          userPassword: this.password1
        }
        userPasswordUpdate(data).then(res => {
          this.$router.push({
            name: 'Login'
          })
        })
      } else {
        this.$notify('两次密码不一致')
      }
    },
    // 返回
    onClickLeft() {
      this.$router.push({
        name: 'Login'
      })
    },
    // 搜索页面
    onClickRight() {
      this.$router.push({
        name: 'search'
      })
    }
  },
  created() {
    this.smsCode = this.$route.query.smsCode
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
    margin: 64px 32px 0 29px;
    .phone {
      border-bottom: 1px solid #eeeeee;
      @include flexbox;
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
    .bttom-text {
      @include flexbox;
      a {
        color: #e4bc31;
      }
      padding-top: 18px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;

      line-height: 40px;
    }
  }
}
</style>
