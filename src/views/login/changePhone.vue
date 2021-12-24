<template>
<!-- 登陆 -->
  <div class="page">
    <van-sticky>
      <van-nav-bar title="修改账号" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="page-content">
      <van-form @submit="login">
        <div class="phone">
           <van-field readonly  v-model="username" label="当前账号 :" />
        </div>
        <div class="password">
          <van-field
            v-model="password"
            :type="showPsd ? 'text' : 'password'"
            placeholder="请输入密码"

          />
          <van-image
            @click="showPassword"
            :src="showPsd ? require('../../assets/icon/showpsd.png') : require('../../assets/icon/hiddenpsd.png')"
          />
        </div>

        <div class="button-box">
          <van-button round block color="#e4bc31" :disabled="!btnDisable" native-type="submit">下一步</van-button>
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
  mounted() {
    this.username = this.$route.query.userName
  },
  computed: {
    btnDisable() {
      if (this.password) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 密码显示于隐藏
    showPassword() {
      this.showPsd = !this.showPsd
    },
    login() {
      this.$router.push({
        path: '/changePhone2',
        query: {
          userPassword: this.password
        }
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
  /deep/.van-nav-bar {
    background: #fff;
    /deep/.van-icon {
      color: #666666;
    }
    /deep/.van-nav-bar__left {
      /deep/ .van-icon-arrow-left {
        color: #666666;
      }
    }
  }

  .page-content {
    margin: 64px 32px 0 29px;
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
