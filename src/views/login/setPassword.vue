<template>
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
            v-model="password"
            :type="showPsd ? 'text' : 'password'"
            placeholder="请输入您密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
          <van-image
            @click="showPassword"
            :src="showPsd ? require('../../assets/icon/showpsd.png') : require('../../assets/icon/hiddenpsd.png')"
          />
        </div>
        <div class="password">
          <van-field
            v-model="password"
            :type="showPsd ? 'text' : 'password'"
            placeholder="再次输入您的密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
          <van-image
            @click="showPassword"
            :src="showPsd ? require('../../assets/icon/showpsd.png') : require('../../assets/icon/hiddenpsd.png')"
          />
        </div>

        <div class="button-box"  @click="onSubmit">
          <van-button round block color="#E4BC31" :disabled="true" native-type="submit">确定</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPsd: false
    }
  },
  methods: {
    // 密码显示于隐藏
    showPassword() {
      this.showPsd = !this.showPsd
    },
    onSubmit(values) {
      this.$router.push({
        name: 'Login'
      })
      console.log('submit', values)
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
  min-height: 100vh;

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
