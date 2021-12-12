<template>
  <div class="page">
    <van-sticky>
      <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="page-content">
      <van-form>
        <div class="phone">
          <span>+86</span>
          <van-field
            v-model="username"
            name="用户名"
            placeholder="请输入您的手机号"
            :rules="[{ required: true, message: '请输入您的手机号' }]"
          />
        </div>
        <div class="password">
          <van-field
            v-model="password"
            :type="showPsd ? 'text' : 'password'"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
            ><template #button>
              <span>发送验证码</span>
            </template></van-field
          >
        </div>

        <div class="button-box" @click="onSubmit">
          <van-button round block color="#ccc" :disabled="true" native-type="submit">下一步</van-button>
        </div>
      </van-form>
      <div class="bottom-t">
        <van-checkbox v-model="checked"></van-checkbox>
        <span>我已阅读并同意<router-link :to="{ name: 'aboutus' }">TOKREN用户协议</router-link></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPsd: false,
      checked: false
    }
  },
  methods: {
    onSubmit(values) {
      this.$router.push({
        name: 'setPassword'
      })
      console.log('submit', values)
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
    .bottom-t {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-top: 44px;
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
